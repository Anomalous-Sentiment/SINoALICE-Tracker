import { ref, onBeforeUnmount } from "vue";

export const useCurrentTime = () => {
    // Get the current time
    const currentTime = ref(new Date());

    // Define function to get current time
    const updateCurrentTime = () => {
        currentTime.value = new Date();
    };

    // Run the function to update time at 1000 ms intervals
    const updateTimeInterval = setInterval(updateCurrentTime, 1000);

    // Stop function from running when unmounted
    onBeforeUnmount(() => {
        clearInterval(updateTimeInterval);
    });
    
  return {
    currentTime
  };
};
