package main.repository;

import java.util.List;
import java.util.UUID;

import main.model.SlidePageList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import main.domain.Slide;

@Repository
public interface SlideRepository extends JpaRepository<Slide, UUID>{

	@Query(value="SELECT MAX(s.orded) FROM Slide s", nativeQuery = true)
	Integer findMaxOrder();

	@Query(value = "SELECT s FROM Slide s WHERE s.enabled = 1" , nativeQuery = true)
	List<Slide> findNotDisabledSlides();

	@Query("SELECT s FROM Slide s WHERE (:filterBy IS NULL OR "
			+ "  (:filterBy = 'orderNumber' AND  s.orderNumber > 0) OR   "
			+ "  (:filterBy = 'enabled'  AND s.enabled = true)  OR "
			+ "  (:filterBy = 'disabled' AND  s.enabled = false)) ")
	Page<Slide> findAllSlides(@Param("filterBy") String filterBy, PageRequest pageable);

	@Query("SELECT s FROM Slide s WHERE s.enabled = true ORDER BY s.orderNumber DESC")
	List<Slide> findAllEnabled();

	Boolean existsByOrderNumber(Integer orderNubmer);
}
