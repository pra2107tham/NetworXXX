import { useEffect, useLayoutEffect } from 'react'

/**
 * A custom hook that safely handles useLayoutEffect during SSR
 * Falls back to useEffect during server-side rendering
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect 