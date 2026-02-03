// Google Analytics 4 helper functions
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Initialize GA4
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) return;
  
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (url) => {
  if (!window.gtag) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (!window.gtag) return;
  window.gtag('event', eventName, eventParams);
};

// Track achievement unlocks
export const trackAchievement = (achievementId, achievementName) => {
  trackEvent('achievement_unlocked', {
    achievement_id: achievementId,
    achievement_name: achievementName,
  });
};

// Track contact form submission
export const trackContactForm = () => {
  trackEvent('contact_form_submit');
};

// Track resume download
export const trackResumeDownload = () => {
  trackEvent('resume_download');
};
