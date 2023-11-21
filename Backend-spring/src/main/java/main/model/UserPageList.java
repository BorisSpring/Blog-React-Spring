package main.model;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class UserPageList extends PageImpl {
    public UserPageList(List content, Pageable pageable, long total) {
        super(content, pageable, total);
    }

    public UserPageList(List content) {
        super(content);
    }
}
