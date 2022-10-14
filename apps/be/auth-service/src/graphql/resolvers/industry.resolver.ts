import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { Industry } from '../dto/industry-category';
import IndustryService from 'src/services/industry.service';
import { CreateIndustryInput } from '../dto/create-industry.input';
import { TwoFAAuthGuard } from 'src/guards/two-fa-auth.guard';
import { AccountType } from 'src/shared/enums/account-type';
import { SuggestedIndustries } from '../dto/suggested-industries';

@Resolver(() => Industry)
export class IndustryResolver {
  constructor(private service: IndustryService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Industry)
  async createIndustry(
    @CurrentUser() user,
    @Args('industry') industryInput: CreateIndustryInput,
  ) {
    return await this.service.create({
      ...industryInput,
      createdBy: user._id,
    });
  }

  @Query(() => [Industry])
  async getAllIndustries() {
    return await this.service.find();
  }
  @UseGuards(TwoFAAuthGuard)
  @Query(() => SuggestedIndustries)
  async getVerifiedIndustries(@Context() { user }) {
    const selectedIndustries =
      user?.accountType == AccountType.Business
        ? user.industryType
          ? [user.industryType]
          : []
        : user?.interests;
    const industries = await this.service.aggregate([
      { $match: { $or: [{ isVerified: true }, { createdBy: user?._id }] } },
      {
        $project: {
          _id: 1,
          industryCategory: 1,
          isVerified: 1,
          createdBy: 1,
          isSelected: {
            $cond: {
              if: {
                $in: [{ $toObjectId: '$_id' }, selectedIndustries || []],
              },
              then: true,
              else: false,
            },
          },
        },
      },
    ]);

    const res = {
      industries,
      selectedIndustries: selectedIndustries || [],
    };

    return res;
  }
}
