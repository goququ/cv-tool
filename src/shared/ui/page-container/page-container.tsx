import type { ElementType, HTMLAttributes } from 'react'

import { pageContainerClass } from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type PageContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
}

function PageContainer({ as, className, ...props }: PageContainerProps) {
  const Component = as ?? 'div'

  return <Component className={cn(pageContainerClass, className)} {...props} />
}

export { PageContainer }
