export interface BlogItem {
  blogId: number;
  blogTitle: string;
  blogContent: string;
}

export function buildBlogItem(blogItemDataToBuild: any): BlogItem {
  if (
    typeof blogItemDataToBuild.blogId !== 'undefined' &&
    typeof blogItemDataToBuild.blogId !== 'number' &&
    isNaN(blogItemDataToBuild.blogId)
  ) {
    throw new Error('"blogItemDataToBuild.blogId" contains non-valid data.');
  }
  if (
    typeof blogItemDataToBuild.blogTitle === 'undefined' ||
    typeof blogItemDataToBuild.blogTitle !== 'string'
  ) {
    throw new Error('"blogItemDataToBuild.blogTitle" contains non-valid data.');
  }

  if (
    typeof blogItemDataToBuild.blogContent === 'undefined' ||
    typeof blogItemDataToBuild.blogContent !== 'string'
  ) {
    throw new Error(
      '"blogItemDataToBuild.blogContent" contains non-valid data.'
    );
  }

  return {
    blogId: blogItemDataToBuild.blogId,
    blogTitle: blogItemDataToBuild.blogTitle,
    blogContent: blogItemDataToBuild.blogContent
  };
}
