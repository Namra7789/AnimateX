package com.example.animationcreator.service;

import com.example.animationcreator.model.Animation;
import com.example.animationcreator.repository.AnimationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimationService {

    @Autowired
    private AnimationRepository animationRepository;

    public Animation saveAnimation(Animation animation) {
        return animationRepository.save(animation);
    }

    public List<Animation> getAllAnimations() {
        return animationRepository.findAll();
    }

    public Animation getAnimationById(Long id) {
        return animationRepository.findById(id).orElse(null);
    }

    public void deleteAnimation(Long id) {
        animationRepository.deleteById(id);
    }
}
