package com.example.animationcreator.repository;

import com.example.animationcreator.model.Animation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimationRepository extends JpaRepository<Animation, Long> {
}
