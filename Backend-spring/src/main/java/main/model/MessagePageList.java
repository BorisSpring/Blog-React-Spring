package main.model;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class MessagePageList extends PageImpl {
    public MessagePageList(List content, Pageable pageable, long total) {
        super(content, pageable, total);
    }

    public MessagePageList(List content) {
        super(content);
    }
}
