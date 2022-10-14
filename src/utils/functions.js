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

/**
 * Returns the conversation between two ids if exists
 * @param {ObjectId} logedUserId
 * @param {ObjectId} selectedId
 * @param {Array} conversations
 */
export const getConversationFromIds = (
  logedUserId,
  selectedId,
  conversations
) => {
  const conversation = conversations.find((conversation) =>
    conversation.participants.every(
      (participant) =>
        participant._id === logedUserId || participant._id === selectedId
    )
  );
  return conversation;
};
