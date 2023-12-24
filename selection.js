window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('.root');
    const selectionBox = document.getElementById('selectionBox');
  
    let isDragging = false;
    let dragStartX;
    let dragStartY;
  
    body.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      selectionBox.style.left = `${dragStartX}px`;
      selectionBox.style.top = `${dragStartY}px`;
      selectionBox.style.width = '0';
      selectionBox.style.height = '0';
      selectionBox.style.display = 'block';
    });
  
    body.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const width = e.clientX - dragStartX;
        const height = e.clientY - dragStartY;
        selectionBox.style.width = `${Math.abs(width)}px`;
        selectionBox.style.height = `${Math.abs(height)}px`;
        selectionBox.style.left = `${width > 0 ? dragStartX : e.clientX}px`;
        selectionBox.style.top = `${height > 0 ? dragStartY : e.clientY}px`;
      }
    });
  
    body.addEventListener('mouseup', () => {
      isDragging = false;
      selectionBox.style.display = 'none';
    });
  });
  