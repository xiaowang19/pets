CREATE OR REPLACE FUNCTION upsert_conversation(
    p_user_id UUID,
    p_other_user_id UUID,
    p_last_message TEXT
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO conversations (user_id, other_user_id, last_message, last_message_time, unread_count)
    VALUES (p_user_id, p_other_user_id, p_last_message, NOW(), 1)
    ON CONFLICT (user_id, other_user_id)
    DO UPDATE SET
        last_message = p_last_message,
        last_message_time = NOW(),
        unread_count = conversations.unread_count + 1;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_likes_count(p_post_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE posts SET likes_count = likes_count + 1 WHERE id = p_post_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_likes_count(p_post_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = p_post_id;
END;
$$ LANGUAGE plpgsql;
