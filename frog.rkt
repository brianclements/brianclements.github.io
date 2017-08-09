#lang frog/config

;; Called early when Frog launches. Use this to set parameters defined
;; in frog/params.
(define/contract (init)
  (-> any)
  (current-scheme/host "http://brianclements.net")
  (current-uri-prefix "/")
  (current-title "Brianclements.net")
  (current-author "Brian Clements")
  (current-editor "$EDITOR")
  (current-editor-command "{editor} {filename}")
  (current-show-tag-counts? #t)
  (current-permalink "/blog/{year}/{month}/{day}/{filename}/index.html")
  (current-index-full? #f)
  (current-feed-full? #t)
  (current-max-feed-items 100)
  (current-decorate-feed-uris? #t)
  (current-feed-image-bugs? #t)
  (current-posts-per-page 6)
  (current-index-newest-first? #t)
  (current-posts-index-uri "/blog-index.html")
  (current-source-dir "src/frog")
  (current-output-dir "build"))

;; Called once per post and non-post page, on the contents.
(define/contract (enhance-body xs)
  (-> (listof xexpr/c) (listof xexpr/c))
  ;; Here we pass the xexprs through a series of functions.
  (~> xs
      (syntax-highlight #:python-executable "python"
                        #:line-numbers? #t
                        #:css-class "source")
      (auto-embed-tweets #:parents? #t)
      (add-racket-doc-links #:code? #t #:prose? #t)))

;; Called from `raco frog --clean`.
(define/contract (clean)
  (-> any)
  (void))
