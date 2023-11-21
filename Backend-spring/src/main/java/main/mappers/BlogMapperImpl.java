package main.mappers;

import lombok.RequiredArgsConstructor;
import main.domain.Blog;
import main.model.BlogDTO;
import main.model.LastThreeDTO;
import main.model.MainPageBlogDTO;
import main.model.SingleBlogDTO;
import main.repository.BlogRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public  class BlogMapperImpl implements  BlogMapper{

    private final BlogRepository blogRepo;

    @Override
    public SingleBlogDTO blogToSingleBlogDto(Blog blog) {

        PageRequest pageable = PageRequest.of(0, 1);

        SingleBlogDTO dto =  SingleBlogDTO
                .builder()
                .tags(blog.getTags())
                .views(blog.getViews() == null ? 0 : blog.getViews())
                .comments(blog.getComments())
                .title(blog.getTitle())
                .image(blog.getImage())
                .description(blog.getDescription())
                .contentBody(blog.getContentBody())
                .firstName(blog.getUser().getFirstName())
                .lastName(blog.getUser().getLastName())
                .userId(blog.getUser().getId())
                .userImage(blog.getUser().getImage() == null ? null : blog.getUser().getImage())
                .created(blog.getCreatedDate())
                .category(blog.getCategory() == null ? null : blog.getCategory().getName())
                .prev(blogRepo.findPrev(blog.getId(), pageable))
                .next(blogRepo.findNext(blog.getId(), pageable))
                .build();

        return  dto;
    }


    @Override
    public MainPageBlogDTO blogToMainPageBlogDto(Blog blog) {
        return  MainPageBlogDTO.builder()
                .blogImage(blog.getImage())
                .id(blog.getId())
                .category(blog.getCategory() == null ? null : blog.getCategory().getName())
                .title(blog.getTitle())
                .description(blog.getDescription())
                .userId(blog.getUser().getId())
                .created(blog.getCreatedDate())
                .numberOfComments((long) blog.getComments().size())
                .firstName(blog.getUser().getFirstName())
                .lastName(blog.getUser().getLastName())
                .userImage(blog.getUser().getImage() == null ? null : blog.getUser().getImage())
                .build();
    }

    @Override
    public BlogDTO blogToBlogDto(Blog blog) {
        return BlogDTO.builder()
                .categoryName(blog.getCategory() == null ? null : blog.getCategory().getName())
                .enabled(blog.isEnabled())
                .id(blog.getId())
                .important(blog.getImportant())
                .title(blog.getTitle())
                .build();
    }

    @Override
    public LastThreeDTO blogToNewestThreeDto(Blog blog) {

        return LastThreeDTO.builder()
                .numberOfViews(blog.getViews() == null ? 0 : blog.getViews())
                .created(blog.getCreatedDate())
                .id(blog.getId())
                .image(blog.getImage() == null ? null : blog.getImage())
                .title(blog.getTitle())
                .numberOfComments((long) blog.getComments().size())
                .build();

    }
}
