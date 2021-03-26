SELECT p.id AS post_id, title, content, img, profile_pic, date_created, username AS author_username 
FROM helo_posts p
JOIN helo_users u ON u.id = p.author_id
WHERE lower(title) like $1
ORDER BY date_created DESC;