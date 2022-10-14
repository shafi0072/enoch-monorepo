import { PostTypeEnums } from "../constants/post-enums";
import {
  ADD_LIKE_ON_COMMENT,
  ADD_POST_COMMENT,
  ADD_REACTION_ON_POST,
  ADD_VOTE,
  CREATE_POLL,
  POST_DOCUMENT,
  POST_PHOTO,
  POST_VIDEO,
  TEXT_POST,
} from "../graphql/mutations/writepost";
import {
  FETCH_POSTS_TIMELINE,
  FETCH_POST_COMMENTS_BY_ID,
  FETCH_REPLIES_FOR_COMMENT,
  FETCH_USERS_FROM_MENTION,
} from "../graphql/queries";
import { messages } from "../locals/en-US";
import AuthClient from "./AuthClient";
import FileServiceClient from "./FileServiceClient";
import ToastService from "./ToastService";

class PostService {
  async videoPost(data: any) {
    const formData = new FormData();
    formData.append("upload", data.file);
    try {
      const {
        data: { media, resourceId },
      } = await FileServiceClient.post("/do-m-upload", formData);

      if (media) {
        const post = {
          title: data.title,
          caption: data.textData,
          type: PostTypeEnums.VIDEO,
          whoCanSee: data.audienceValue,
          mediaResources: media,
          resourceId: resourceId,
        };
        try {
          const res = await AuthClient.mutation(POST_VIDEO, {
            post,
          });
          if (res) ToastService.success(messages.writePost.video.success);
        } catch (err: any) {
          ToastService.error(err.message);
        }
      }
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async photoPost(data: any) {
    const formData = new FormData();
    formData.append("upload", data.file);
    try {
      const {
        data: { media, resourceId },
      } = await FileServiceClient.post("/do-m-upload", formData);

      if (media) {
        const post = {
          title: data.title,
          caption: data.caption,
          type: PostTypeEnums.IMAGE,
          postingAs: data.postingAs,
          mediaResources: media,
          resourceId: resourceId,
        };
        try {
          const res = await AuthClient.mutation(POST_PHOTO, {
            post,
          });
          if (res) ToastService.success(messages.writePost.photo.success);
        } catch (err: any) {
          ToastService.error(err.message);
        }
      }
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async documentPost(data: any) {
    const formData = new FormData();
    formData.append("upload", data.post.file);

    try {
      const {
        data: { media, resourceId },
      } = await FileServiceClient.post("/do-m-upload", formData);

      if (media) {
        const post = {
          title: data.post.title,
          caption: data.post.textData,
          type: PostTypeEnums.DOCUMENT,
          whoCanSee: data.post.audienceValue,
          mediaResources: media,
          resourceId: resourceId,
        };
        try {
          const res = await AuthClient.mutation(POST_DOCUMENT, {
            post,
          });
          if (res) ToastService.success(messages.writePost.document.success);
        } catch (err: any) {
          ToastService.error(err.message);
        }
      }
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async createPoll(poll: any) {
    try {
      const res = await AuthClient.mutation(CREATE_POLL, {
        poll,
      });
      if (res) ToastService.success(messages.writePost.poll.success);
      return res;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async textPost(data: any) {
    const post = {
      caption: data.textData,
      type: PostTypeEnums.TEXT,
      whoCanSee: data.audienceValue,
    };
    try {
      const res = await AuthClient.mutation(TEXT_POST, {
        post,
      });
      if (res) ToastService.success(messages.writePost.text.success);
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async getTimeline() {
    let response = null;
    try {
      const {
        data: { getUserTimeLine },
      } = await AuthClient.query(FETCH_POSTS_TIMELINE);
      response = getUserTimeLine;
    } catch (err: any) {
      ToastService.error(err.message);
    }
    return response;
  }

  async addPostComment(postId: string, comment: any) {
    try {
      const res = await AuthClient.mutation(ADD_POST_COMMENT, {
        postId,
        comment,
      });
      ToastService.success("Comment added");
      return res;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async getCommentsByPostId(
    postId: string,
    nextCursor: string = "",
    limit: Number
  ) {
    try {
      const response = await AuthClient.query(FETCH_POST_COMMENTS_BY_ID, {
        variables: { postId, nextCursor, limit },
      });
      return response;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async fetchUsersFromMention(query: string) {
    let response = null;
    try {
      const {
        data: { mentionSearch },
      } = await AuthClient.query(FETCH_USERS_FROM_MENTION, {
        variables: { mentionQuery: { query } },
      });

      response = mentionSearch;
    } catch (err: any) {
      ToastService.error(err.message);
    }
    return response;
  }

  async getRepliesForComment(
    postId: string,
    nextCursor: string,
    limit: number,
    commentId: string
  ) {
    try {
      const {
        data: { getRepliesForComment },
      } = await AuthClient.query(FETCH_REPLIES_FOR_COMMENT, {
        variables: { postId, nextCursor, limit, commentId },
      });
      return getRepliesForComment;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async addLikeOnComment(postId: string, commentId: string) {
    try {
      const response = await AuthClient.mutation(ADD_LIKE_ON_COMMENT, {
        postId: postId,
        commnetId: commentId,
      });
      return response;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async addVote(selectedOption: string, postId: string) {
    try {
      const response = await AuthClient.mutation(ADD_VOTE, {
        selectedOption: selectedOption,
        postId: postId,
      });
      return response;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }

  async addReactionOnPost(postId: string, reactionType: string) {
    try {
      const response = await AuthClient.mutation(ADD_REACTION_ON_POST, {
        postId,
        reactionType,
      });
      return response;
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }
}

export default new PostService();
