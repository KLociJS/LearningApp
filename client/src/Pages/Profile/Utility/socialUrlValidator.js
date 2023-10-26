const githubValidator = (url) => {
  const githubRegex = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/?$/;
  return githubRegex.test(url);
};

const linkedInValidator = (url) => {
  const linkedInRegex = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
  return linkedInRegex.test(url);
};

const twitterValidator = (url) => {
  const twitterRegex = /^https:\/\/twitter\.com\/[a-zA-Z0-9_]+\/?$/;
  return twitterRegex.test(url);
};

export { githubValidator, linkedInValidator, twitterValidator };
