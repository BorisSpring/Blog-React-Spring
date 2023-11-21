package main.model;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class CommentPageList extends PageImpl {
    public CommentPageList(List content, Pageable pageable, long total) {
        super(content, pageable, total);
    }

    public CommentPageList(List content) {
        super(content);
    }
}
