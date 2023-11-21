package main.mappers;

import main.domain.Blog;
import main.model.BlogDTO;
import main.model.LastThreeDTO;
import main.model.MainPageBlogDTO;
import main.model.SingleBlogDTO;


public interface BlogMapper {

    MainPageBlogDTO blogToMainPageBlogDto(Blog blog);

    BlogDTO blogToBlogDto(Blog blog);

    LastThreeDTO blogToNewestThreeDto(Blog blog);

    SingleBlogDTO blogToSingleBlogDto(Blog blog);
}
