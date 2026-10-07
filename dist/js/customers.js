function switchAccordion(index) {
    for (let i = 0; i < 4; i++) {
        const item = document.getElementById('acc-item-' + i);
        const dot = document.getElementById('acc-dot-' + i);
        const label = document.getElementById('acc-label-' + i);
        const content = document.getElementById('acc-content-' + i);

        if (i === index) {
            item.style.background = 'linear-gradient(90deg, #E3ECDA 0%, #F4F6F0 60%)';
            dot.className = 'w-[7px] h-[7px] rounded-full flex-shrink-0 bg-[#7fb35c]';
            label.className = 'text-[11px] font-bold tracking-[1.5px] uppercase text-[#6a6a62]';
            content.classList.remove('hidden');
        } else {
            item.style.background = '';
            dot.className = 'w-[7px] h-[7px] rounded-full flex-shrink-0 bg-[#c4c4bc]';
            label.className = 'text-[11px] font-bold tracking-[1.5px] uppercase text-[#9a9a92]';
            content.classList.add('hidden');
        }
    }
}

switchAccordion(0);