/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    // the settings for each one of the slides uncover instances.
    const uncoverOpts = [
        {
            // total number of slices.
            slicesTotal: 5,
            // slices color.
            slicesColor: '#111',
            // 'vertical' || 'horizontal'.
            orientation: 'vertical',
            // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
            slicesOrigin: {show: 'top', hide: 'bottom'}
        },
        {
            slicesTotal: 3, 
            slicesColor: '#111', 
            orientation: 'horizontal', 
            slicesOrigin:  {show: 'right', hide: 'right'}
        },
        {
            slicesTotal: 5,
            slicesColor: '#111',
            orientation: 'vertical',
            slicesOrigin:  {show: 'bottom', hide: 'bottom'}
        },
        {
            slicesTotal: 3,
            slicesColor: '#111',
            orientation: 'horizontal',
            slicesOrigin:  {show: 'left', hide: 'left'}
        }
    ];

    class RevealAnimation {
        /* Pass element and index of animation (-1 for random) */
        constructor(el, op) {
            const opt = op < 0 ? Math.floor((Math.random() * uncoverOpts.length)) : op;
            const animation = uncoverOpts[opt];
            new Uncover(el, animation).show(true, {
                image: {
                    duration: 800,
                    delay: 200,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            });
        }
    }
    // Animation
    var elements = document.querySelectorAll('.reveal-animation');
    elements.forEach(element => new RevealAnimation(element, -1));
}