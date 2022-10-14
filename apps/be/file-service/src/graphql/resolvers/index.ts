import { s3UploadResolver } from './s3Upload.resolver';
import { AuthorsResolver } from './authors.resolver';

const resolvers = [AuthorsResolver, s3UploadResolver];

export default resolvers;
