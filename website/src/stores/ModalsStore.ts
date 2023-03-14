import { createContainer } from 'unstated-next';
import { useBoolean } from 'usehooks-ts';

export function useModalsStore() {
  const uploadPicsModal = useBoolean(false);

  return { uploadPicsModal };
}

export const ModalsContainer = createContainer(useModalsStore);

