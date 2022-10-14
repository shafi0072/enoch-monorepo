import {
    Args,
    Mutation,
    Query,
    Resolver,
    Subscription,
    Context,
    Parent,
    ResolveField,
    Int,
  } from '@nestjs/graphql';
  import { PubSub } from 'graphql-subscriptions';
  import { ContactModel } from '../models/contact.model';
  import { SubscriberModel } from '../models/subscriber.model';
  import { JtenochModel } from '../models/jtenoch.model';
  import ContactService from 'src/services/contact.service';
  import SubscriberService from 'src/services/subscriber.service';
  import JtenochService from 'src/services/jtenoch.service';
  import { CreateContactInput } from '../dto/create-contact.input';
  import { CreateSubscriberInput } from '../dto/create-subscriber.input';
  import { CreateJtenochInput } from '../dto/create-jtenoch.input';
  import { ContactDocument } from '../models/contact.documents'
  import { SubscriberDocument } from '../models/subscriber.documents'
  import { JtenochDocument } from '../models/jtenoch.documents'
  import { TasksService } from 'src/services/tasks.service';

  
  const pubSub = new PubSub();
  @Resolver(() => ContactModel)
  export class FrontsResolver {
    constructor(private readonly contactService: ContactService, private readonly tasksService: TasksService, private readonly subscriberService: SubscriberService, private readonly jtenochService: JtenochService) {}
    
    @Query(() => String)
    sayHello(): string {
      return 'Hello World!';
    }

    @Mutation(() => ContactModel)
    async addContact(
      @Args('conatct') contactBody: CreateContactInput,
    ) {
      const newContact = await this.contactService.addContact(contactBody);
      return newContact;
    }

    @Mutation(() => SubscriberModel)
    async addSubscriber(
      @Args('subscriber') subscriberBody: CreateSubscriberInput,
    ) {
      const newSubscriber = await this.subscriberService.addSubscriber(subscriberBody);
      return newSubscriber;
    }

    @Query(() => SubscriberDocument)
    async getSubscriberAll(){
      const getSubscriber = await this.subscriberService.getSubscriber();
      return getSubscriber;
    }

    @Mutation(() => JtenochModel)
    async addJtenoch(
      @Args('jtenoch') jtenochBody: CreateJtenochInput,
    ) {
      const newJtenoch = await this.jtenochService.addJtenoch(jtenochBody);
      return newJtenoch;
    }

    @Query(() => JtenochDocument)
    async getJtenochAll(){
      const getJtenoch = await this.jtenochService.getJtenoch();
      return getJtenoch;
    }
  }
  