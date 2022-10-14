import { FileUploadResolver } from './fileUpload.resolver';
import { MediaResolver } from './media.resolver';
import { SubscriptionResolver } from './subscription.resolver';

const resolvers = [MediaResolver, SubscriptionResolver, FileUploadResolver];

export default resolvers;
