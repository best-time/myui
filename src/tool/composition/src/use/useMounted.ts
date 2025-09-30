import { delay } from "@peryl/utils/delay";
import { onBeforeUnmount, onMounted, ref } from "vue";

export function useMounted(duration?: number) {
  const isMounted = ref(false);
  onMounted(() => {
    if (duration == null) {
      isMounted.value = true;
    } else {
      delay(duration).then(() => {
        isMounted.value = true;
      });
    }
  });
  onBeforeUnmount(() => (isMounted.value = false));
  return isMounted;
}
