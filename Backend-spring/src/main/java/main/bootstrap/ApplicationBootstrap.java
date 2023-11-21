package main.bootstrap;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import main.domain.*;
import main.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ApplicationBootstrap implements CommandLineRunner {

    private final AuthorityRepository authorityRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final SlideRepository slideRepository;
    private final TagRepository tagRepository;
    private final MessageRepository messageRepository;
    private final PasswordEncoder passwordEncoder;
    private final BlogRepository blogRepository;

    private final CommentRepository commentRepository;

    @Transactional
    @Override
    public void run(String... args) throws Exception {

        Authority admin = authorityRepository.saveAndFlush(Authority.builder()
                .authority("admin")
                .build());
        Authority user = authorityRepository.saveAndFlush(Authority.builder()
                .authority("user")
                .build());
        Authority superadmin = authorityRepository.saveAndFlush(Authority.builder()
                .authority("superadmin")
                .build());


        User boris = userRepository.saveAndFlush(User.builder()
                .number("1234567")
                .enabled(true)
                .email("boris@hotmail.com")
                .password(passwordEncoder.encode("12345"))
                .lastName("dimitrijevic")
                .firstName("boris")
                .image("user.png")
                .authority(admin)
                .build());

        User loreana = userRepository.saveAndFlush(User.builder()
                .number("12345678")
                .enabled(true)
                .email("loreana@hotmail.com")
                .password(passwordEncoder.encode("12345"))
                .lastName("beatovic")
                .firstName("loreana")
                .image("user.png")
                .authority(user)
                .build());

        User helena = userRepository.saveAndFlush(User.builder()
                .number("123456789")
                .enabled(false)
                .email("loreanaBanned@hotmail.com")
                .password(passwordEncoder.encode("12345"))
                .lastName("helena")
                .firstName("loreana")
                .image("user.png")
                .authority(user)
                .build());


        categoryRepository.saveAndFlush(Category.builder()
                    .name("Health")
                    .build());
            categoryRepository.saveAndFlush(Category.builder()
                    .name("Sport")
                    .build());
            categoryRepository.saveAndFlush(Category.builder()
                    .name("Buisness")
                    .order(3)
                    .build());
            categoryRepository.saveAndFlush(Category.builder()
                    .name("Softwaer Development")
                    .build());
            categoryRepository.saveAndFlush(Category.builder()
                    .name("Money")
                    .order(1)
                    .build());
            categoryRepository.saveAndFlush(Category.builder()
                    .name("Training")
                    .order(2)
                    .build());


        Tag health = tagRepository.saveAndFlush(Tag.builder()
                .name("Health")
                .build());
        Tag danger = tagRepository.saveAndFlush(Tag.builder()
                .name("Danger")
                .build());
        tagRepository.saveAndFlush(Tag.builder()
                    .name("Tenis")
                    .build());
        Tag java = tagRepository.saveAndFlush(Tag.builder()
                .name("Java")
                .build());
        Tag css = tagRepository.saveAndFlush(Tag.builder()
                .name("CSS")
                .build());
        Tag airplanesBuisness = tagRepository.saveAndFlush(Tag.builder()
                .name("Airplanes Buisness")
                .build());
        Tag basketball = tagRepository.saveAndFlush(Tag.builder()
                .name("Basketball")
                .build());
        Tag gym = tagRepository.saveAndFlush(Tag.builder()
                .name("Gym")
                .build());
        Tag yoga = tagRepository.saveAndFlush(Tag.builder()
                .name("Yoga")
                .build());


            messageRepository.saveAndFlush(Message.builder()
                            .message("Hello could can i become blogger?")
                            .readed(false)
                            .email("Boris@hotmail.com")
                            .name("Boris Dimitrijevic")
                            .build());

            messageRepository.saveAndFlush(Message.builder()
                    .message("I want start blogging with u guys???Can u invite me")
                    .readed(false)
                    .email("Jeca@hotmail.com")
                    .name("Jeca Beatovic")
                    .build());

            messageRepository.saveAndFlush(Message.builder()
                    .message("When it comes to the gym can u give me some more advice? Thanks...")
                    .readed(false)
                    .email("Darko@hotmail.com")
                    .name("Darko Molnar")
                    .build());

            messageRepository.saveAndFlush(Message.builder()
                    .message("I think some information provided in your blog isnt correct spelled correct, can u change it please...?")
                    .readed(false)
                    .email("Andrian@hotmail.com")
                    .name("Andrian Petrosev")
                    .build());

            messageRepository.saveAndFlush(Message.builder()
                    .message("I have one good idea for blog can we get in touch on skype...?")
                    .readed(false)
                    .email("Andrijana@hotmail.com")
                    .name("Andrijana Dimitrijevic")
                    .build());

            messageRepository.saveAndFlush(Message.builder()
                    .message("Hello could can i become payed blogger?")
                    .readed(true)
                    .email("Aleksa@hotmail.com")
                    .name("Aleksa Copic")
                    .build());


            blogRepository.saveAndFlush(Blog.builder()
                            .user(boris)
                            .enabled(true)
                            .important(2)
                            .title("Mastering the Basics of Tennis")
                            .description("Ace Your Game: A Comprehensive Guide to Tennis Fundamentals")
                            .image("tenis-2.jpg")
                              .tags(Arrays.asList(yoga,basketball))
                            .contentBody("Whether you're a beginner or looking to refine your skills, this blog covers the essential basics of tennis. From proper grip techniques to footwork and basic strokes, embark on your journey to becoming a tennis pro.")
                             .build());



        Blog blog = blogRepository.saveAndFlush(Blog.builder()
                .user(boris)
                .enabled(false)
                .important(3)
                .title("The Mental Game of Tennis - Strategies for Success")
                .description("Mind Over Matter: Developing a Winning Mindset in Tennis")
                .contentBody("Tennis is as much a mental game as it is physical. Explore strategies to enhance your mental toughness on the court, manage stress, and stay focused during crucial points. Elevate your game with a strong mental game.")
                .image("tenis-1.jpg")
                .views(0)
                .tags(Arrays.asList(yoga, basketball))
                .build());

        Comment comment1 = Comment.builder().blog(blog).name("boris").content("Good blog").email("boris@hotmail.com").enabled(true).build();
        Comment  comment2 = Comment.builder().blog(blog).name("loreana").content("Perfect blog").email("loreana@hotmail.com").enabled(true).build();
        Comment  comment3 = Comment.builder().blog(blog).name("helena").content("Awesome blog").email("helena@hotmail.com").enabled(true).build();
        Comment  comment4 = Comment.builder().blog(blog).name("andrijana").content("Very bad blog").email("andrijana@hotmail.com").enabled(false).build();
        Comment  comment5 = Comment.builder().blog(blog).name("darko").content("Awful blog").email("darko@hotmail.com").enabled(false).build();



        List<Comment> comments = Arrays.asList(comment1,comment2,comment3,comment4,comment5);

        commentRepository.saveAllAndFlush(comments);

        blogRepository.saveAndFlush(Blog.builder()
                .user(loreana)
                .enabled(true)
                .important(4)
                .title("Unveiling the Secrets of Grand Slam Tournaments")
                .description("MBehind the Net: Inside the Prestigious Grand Slam Tournaments")
                .image("tenis-3.jpg")
                 .views(100)
                .tags(Arrays.asList(yoga,basketball))
                .contentBody("Take a behind-the-scenes look at the world of Grand Slam tournaments. From the history of iconic venues to the legendary matches and champions, this blog provides an in-depth exploration of the most prestigious events in tennis")
                .build());

        blogRepository.saveAndFlush(Blog.builder()
                .user(loreana)
                .enabled(true)
                .important(4)
                .views(9500)
                .title("The Ultimate Guide to Effective Gym Workouts for Beginners")
                .description("Breaking a Sweat: A Beginner's Roadmap to Gym Success")
                .image("gym-1.jpg")
                .tags(Arrays.asList(gym))
                .contentBody("New to the gym scene? This blog guides beginners through the basics of gym workouts. From choosing the right exercises to understanding gym etiquette, embark on your fitness journey with confidence and knowledge.")
                .build());

        blogRepository.saveAndFlush(Blog.builder()
                .user(loreana)
                .enabled(true)
                .important(4)
                .views(10000)
                .title("TMastering the Basics - A Comprehensive Guide to Coding Fundamentals")
                .description("Decoding Code: A Beginner's Journey into Programming")
                .image("it-1.jpg")
                .tags(Arrays.asList(css,java))
                .contentBody("Dive into the world of coding! This blog series breaks down fundamental concepts of programming languages, offering practical tips and resources for beginners. Explore the building blocks of code and lay a solid foundation for your programming journey.")
                .build());


        blogRepository.saveAndFlush(Blog.builder()
                .user(loreana)
                .enabled(true)
                .important(4)
                .views(756)
                .tags(Arrays.asList(css,java))
                .title("Cybersecurity 101 - Protecting Your Digital Fortress")
                .description("Guardians of the Digital Realm: Understanding Cybersecurity Essentials")
                .image("it-2.jpg")
                .contentBody("Guardians of the Digital Realm: Understanding Cybersecurity Essentials\"\n" +
                                "Description: In an era of digital threats, this blog explores the basics of cybersecurity. From password management to recognizing phishing attempts, empower yourself with knowledge to safeguard your digital identity and navigate the online landscape securely.")
                .build());


        slideRepository.saveAndFlush(Slide.builder()
                .buttonTitle("Instagram")
                .orderNumber(1)
                .title("Welcome Page Of Instagram")
                .buttonUrl("https://www.instagram.com/")
                .image("instagram.png")
                .enabled(true)
                .build());

        slideRepository.saveAndFlush(Slide.builder()
                .buttonTitle("facebook")
                .orderNumber(2)
                .title("You can go on facebook page by click link bellow")
                .buttonUrl("https://www.facebook.com")
                .image("facebook.png")
                .enabled(true)
                .build());

        slideRepository.saveAndFlush(Slide.builder()
                .buttonTitle("twiter")
                .orderNumber(3)
                .title("U can go on twitter by clicking link bellow")
                .buttonUrl("https://twitter.com/?lang=sr")
                .image("twitter.jpg")
                .enabled(true)
                .build());

        slideRepository.saveAndFlush(Slide.builder()
                .buttonTitle("Youtube Link")
                .orderNumber(4)
                .title("You can go on youtube by clicking link bellow")
                .buttonUrl("https://youtube.com")
                .image("youtube.jpg")
                .enabled(true)
                .build());

        slideRepository.saveAndFlush(Slide.builder()
                .buttonTitle("Youtube Link")
                .orderNumber(5)
                .title("Enabled first")
                .buttonUrl("https://youtube.com")
                .image("youtube.jpg")
                .enabled(false)
                .build());

        slideRepository.saveAndFlush(Slide.builder()
                .buttonTitle("Youtube Link")
                .orderNumber(5)
                .title("Enabled second")
                .buttonUrl("https://youtube.com")
                .image("youtube.jpg")
                .enabled(false)
                .build());

    }
}
