#lang racket

(local-require racket/file
               racket/path
               markdown)

(provide get-fragment)

(define fragments (make-hash))

;; Read markdown files and return as html
(define (read-md-file filename)
  (let ([xs (parse-markdown (file->string filename))])
    ; Return null if file is empty
    (if (equal? xs '())
        null
        (xexpr->string `(div ()
                          ,@xs)))))

;; Looks for markdown files in the "fragments" directory, parses them into
;; html, and stores them in the fragments hash table with the filename as the
;; key.
(define (compile-fragments dir)
  (for ([path (in-directory dir)])
    (when (regexp-match? #rx"[.]md$" path)
      (let* ([filebase (string-trim (path->string (file-name-from-path path))
                                    ".md")]
             [html (read-md-file (path->string path))])
        (hash-set! fragments filebase html)))))

(define (get-fragment name)
  (hash-ref fragments name))

(compile-fragments "src/fragments")
