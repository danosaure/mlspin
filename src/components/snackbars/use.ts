import { useSafeContext } from '../use-safe-context';
import { SnackbarsContext } from './context';
import { SnackbarsContextType } from './types';

const useSnackbars = (): SnackbarsContextType => useSafeContext(SnackbarsContext);

export { useSnackbars };
