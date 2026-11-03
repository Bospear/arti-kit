import {
  useCallback,
  useId,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import './Navigation.css';

export type TreeNavigationItem = {
  id: string;
  label: ReactNode;
  children?: TreeNavigationItem[];
  href?: string;
};

export type TreeNavigationProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  items: TreeNavigationItem[];
  /** Controlled expanded node ids. */
  expandedIds?: string[];
  /** Uncontrolled initial expanded ids. */
  defaultExpandedIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
  /** Currently active / selected leaf or node id. */
  activeId?: string;
  onSelect?: (id: string) => void;
  /** Enable ArrowLeft/ArrowRight expand/collapse and ArrowUp/Down focus move. */
  keyboardNavigation?: boolean;
  'aria-label'?: string;
};

function collectFocusableIds(items: TreeNavigationItem[], expanded: Set<string>): string[] {
  const ids: string[] = [];
  const walk = (nodes: TreeNavigationItem[]) => {
    for (const node of nodes) {
      ids.push(node.id);
      if (node.children?.length && expanded.has(node.id)) {
        walk(node.children);
      }
    }
  };
  walk(items);
  return ids;
}

type TreeNodeProps = {
  item: TreeNavigationItem;
  depth: number;
  expanded: Set<string>;
  toggle: (id: string) => void;
  activeId?: string;
  onSelect?: (id: string) => void;
  baseId: string;
  keyboardNavigation: boolean;
  focusableIds: string[];
};

function TreeNode({
  item,
  depth,
  expanded,
  toggle,
  activeId,
  onSelect,
  baseId,
  keyboardNavigation,
  focusableIds,
}: TreeNodeProps) {
  const hasChildren = Boolean(item.children?.length);
  const isExpanded = expanded.has(item.id);
  const isActive = activeId === item.id;
  const groupId = `${baseId}-${item.id}-group`;

  const handleActivate = () => {
    onSelect?.(item.id);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!keyboardNavigation) return;

    if (e.key === 'ArrowRight' && hasChildren) {
      e.preventDefault();
      if (!isExpanded) toggle(item.id);
      return;
    }
    if (e.key === 'ArrowLeft' && hasChildren) {
      e.preventDefault();
      if (isExpanded) toggle(item.id);
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = focusableIds.indexOf(item.id);
      if (idx < 0) return;
      const nextIdx = e.key === 'ArrowDown' ? idx + 1 : idx - 1;
      const nextId = focusableIds[nextIdx];
      if (!nextId) return;
      const el = document.getElementById(`${baseId}-node-${nextId}`);
      el?.focus();
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (hasChildren && !item.href) {
        toggle(item.id);
      }
      handleActivate();
    }
  };

  const rowClass = [
    'art-tree-nav__row',
    isActive ? 'art-tree-nav__row--active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {hasChildren ? (
        <button
          type="button"
          className="art-tree-nav__toggle"
          aria-expanded={isExpanded}
          aria-controls={groupId}
          onClick={(e) => {
            e.stopPropagation();
            toggle(item.id);
          }}
          tabIndex={-1}
        >
          <span className="art-tree-nav__chevron" aria-hidden="true">
            {isExpanded ? '▾' : '▸'}
          </span>
        </button>
      ) : (
        <span className="art-tree-nav__toggle art-tree-nav__toggle--spacer" aria-hidden="true" />
      )}
      <span className="art-tree-nav__label">{item.label}</span>
    </>
  );

  return (
    <li
      className="art-tree-nav__node"
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isActive}
    >
      {item.href != null ? (
        <a
          id={`${baseId}-node-${item.id}`}
          href={item.href}
          className={rowClass}
          style={{ paddingInlineStart: `calc(var(--space-2) + ${depth} * var(--space-4))` }}
          onClick={(e) => {
            handleActivate();
            if (hasChildren) {
              e.preventDefault();
              toggle(item.id);
            }
          }}
          onKeyDown={handleKeyDown}
        >
          {content}
        </a>
      ) : (
        <button
          id={`${baseId}-node-${item.id}`}
          type="button"
          className={rowClass}
          style={{ paddingInlineStart: `calc(var(--space-2) + ${depth} * var(--space-4))` }}
          onClick={() => {
            if (hasChildren) toggle(item.id);
            handleActivate();
          }}
          onKeyDown={handleKeyDown}
        >
          {content}
        </button>
      )}
      {hasChildren && isExpanded && (
        <ul id={groupId} className="art-tree-nav__group" role="group">
          {item.children!.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              depth={depth + 1}
              expanded={expanded}
              toggle={toggle}
              activeId={activeId}
              onSelect={onSelect}
              baseId={baseId}
              keyboardNavigation={keyboardNavigation}
              focusableIds={focusableIds}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * Nested tree navigation with expand/collapse and optional arrow-key support.
 */
export function TreeNavigation({
  items,
  expandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  activeId,
  onSelect,
  keyboardNavigation = true,
  className = '',
  'aria-label': ariaLabel = 'Tree',
  ...props
}: TreeNavigationProps) {
  const baseId = useId();
  const isControlled = expandedIds !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(() => new Set(defaultExpandedIds));
  const expanded = isControlled ? new Set(expandedIds) : internalExpanded;

  const toggle = useCallback(
    (id: string) => {
      const next = new Set(expanded);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      const list = [...next];
      if (!isControlled) setInternalExpanded(next);
      onExpandedChange?.(list);
    },
    [expanded, isControlled, onExpandedChange]
  );

  const focusableIds = collectFocusableIds(items, expanded);

  return (
    <nav
      className={['art-tree-nav', className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      {...props}
    >
      <ul className="art-tree-nav__root" role="tree">
        {items.map((item) => (
          <TreeNode
            key={item.id}
            item={item}
            depth={0}
            expanded={expanded}
            toggle={toggle}
            activeId={activeId}
            onSelect={onSelect}
            baseId={baseId}
            keyboardNavigation={keyboardNavigation}
            focusableIds={focusableIds}
          />
        ))}
      </ul>
    </nav>
  );
}
