-- Query1: select all articles with their author’s email.
-- 在assignment Database，
-- 選擇從article Table顯示欄位 id, title, content, email，
-- 將article Table的author_id與user Table的id做 inner join對應，
-- 並以article Table的id做排序。
use assignment;
select article.id,article.title, article.content, user.email
from article
inner join user on article.author_id = user.id
order by article.id;

-- Query2: select articles from 7th to 12th sorted by id.
-- 限制顯示6筆資料，並跳過前6筆資料從id=7開始顯示。
use assignment;
select article.id,article.title,article.content,user.email
from article
inner join user on article.author_id = user.id
order by id
limit 6 offset 6;