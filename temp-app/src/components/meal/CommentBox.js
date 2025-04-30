import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Avatar, Caption } from 'react-native-paper';

const CommentBox = ({ comment }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Generate initials from username
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <Avatar.Text 
            size={40} 
            label={getInitials(comment.userName)} 
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{comment.userName}</Text>
            <Caption>{formatDate(comment.createdAt)}</Caption>
          </View>
        </View>
        <Text style={styles.commentText}>{comment.comment}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: '#2196F3',
  },
  userInfo: {
    marginLeft: 12,
  },
  userName: {
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default CommentBox; 