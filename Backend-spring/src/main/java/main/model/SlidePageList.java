package main.model;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class SlidePageList extends PageImpl {
    public SlidePageList(List content, Pageable pageable, long total) {
        super(content, pageable, total);
    }

    public SlidePageList(List content) {
        super(content);
    }
}
