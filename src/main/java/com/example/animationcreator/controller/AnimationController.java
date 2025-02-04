package com.example.animationcreator.controller;

import com.example.animationcreator.model.Animation;
import com.example.animationcreator.service.AnimationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animations")
public class AnimationController {

    @Autowired
    private AnimationService animationService;

    @PostMapping
    public Animation createAnimation(@RequestBody Animation animation) {
        return animationService.saveAnimation(animation);
    }

    @GetMapping
    public List<Animation> getAllAnimations() {
        return animationService.getAllAnimations();
    }

    @GetMapping("/{id}")
    public Animation getAnimationById(@PathVariable Long id) {
        return animationService.getAnimationById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteAnimation(@PathVariable Long id) {
        animationService.deleteAnimation(id);
    }
}
