import { testModuleRef } from '../../test/utils';
import PostService from './post.service';

describe('PostService', () => {
  let postServie: PostService;

  beforeEach(async () => {
    const moduleRef = await testModuleRef.compile();
    postServie = moduleRef.get(PostService);
  });

  describe('getPostById', () => {
    it('should return a post by id', async () => {
      const testPost = await postServie.create({ title: 'Test Post' });
      const foundPost = await postServie.findById(testPost._id);
      expect(foundPost.title).toBe(testPost.title);
    });
  });
});
