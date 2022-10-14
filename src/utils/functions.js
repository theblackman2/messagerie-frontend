/**
 *
 * @param {ObjectId} logedUserId
 * @param {ObjectId} selectedUserId
 * @param {Array} conversations
 */
export const getConversation = (id, conversations) =>
  conversations.find((conversation) => conversation._id === id);

/**
 *
 * @param {HTML Element} scrollRef the scroll reference
 * @param {Boolean} smooth true for smooth scroll
 */
export const scrollToBottom = (scrollRef, smooth) => {
  scrollRef.current?.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
  });
};
