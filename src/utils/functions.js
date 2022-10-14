/**
 *
 * @param {ObjectId} logedUserId
 * @param {ObjectId} selectedUserId
 * @param {Array} conversations
 */
export const getConversation = (id, conversations) =>
  conversations.find((conversation) => conversation._id === id);
