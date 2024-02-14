document.addEventListener('DOMContentLoaded', function() {
  const letter = document.querySelector('.letter');
  const letterRect = letter.getBoundingClientRect();
  const bubbleRadius = 25;

  const bubble1 = document.getElementById('bubble1');
  const bubble2 = document.getElementById('bubble2');
  const bubble3 = document.getElementById('bubble3');
  const bubble4 = document.getElementById('bubble4');

  positionBubble(bubble1, -140);
  positionBubble(bubble2, -45);
  positionBubble(bubble3, 45);
  positionBubble(bubble4, 115);

  function positionBubble(bubble, angle) {
      const centerX = letterRect.left + letterRect.width / 2;
      const centerY = letterRect.top + letterRect.height / 2;
      const angleRad = angle * Math.PI / 180;

      const bubbleX = centerX + Math.cos(angleRad) * (letterRect.width / 2 + bubbleRadius);
      const bubbleY = centerY + Math.sin(angleRad) * (letterRect.height / 2 + bubbleRadius);

      bubble.style.left = bubbleX - bubbleRadius + 'px';
      bubble.style.top = bubbleY - bubbleRadius + 'px';
  }
});
