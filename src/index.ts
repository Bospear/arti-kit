/**
 * Artikit — Artificer design system components for React 19.
 * Import styles: `import 'artikit/styles.css'` (includes design tokens).
 */
import './styles/fonts.css';
import './styles/tokens.css';

export { Button } from './components/Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button/Button';
export { IconButton } from './components/Button/IconButton';
export type { IconButtonProps } from './components/Button/IconButton';
export { SplitButton } from './components/Button/SplitButton';
export type { SplitButtonProps, SplitButtonAction } from './components/Button/SplitButton';
export { ButtonStatus } from './components/Button/ButtonStatus';
export type { ButtonStatusProps, ButtonStatusTone } from './components/Button/ButtonStatus';

export { Card, CardHeader, CardBody, CardFooter } from './components/Card/Card';
export type {
  CardProps,
  CardVariant,
  CardLayout,
  CardDensity,
  CardSectionProps,
} from './components/Card/Card';
export { EntityCard } from './components/Card/EntityCard';
export type { EntityCardProps } from './components/Card/EntityCard';
export {
  CampaignCard,
  CharacterCard,
  NpcCard,
  MonsterCard,
  SpellCard,
  MagicItemCard,
  QuestCard,
  JournalEntryCard,
  LocationCard,
  SessionCard,
  WikiArticleCard,
} from './components/Card/domain';
export type {
  CampaignCardProps,
  CharacterCardProps,
  NpcCardProps,
  MonsterCardProps,
  SpellCardProps,
  MagicItemCardProps,
  QuestCardProps,
  JournalEntryCardProps,
  LocationCardProps,
  SessionCardProps,
  WikiArticleCardProps,
} from './components/Card/domain';
export { Banner } from './components/Banner/Banner';
export type { BannerProps, BannerVariant, BannerSize } from './components/Banner/Banner';

export { Input, Textarea, Select, PasswordInput, SearchInput } from './components/Input/Input';
export type {
  InputProps,
  InputSuggestion,
  TextareaProps,
  SelectProps,
  SelectOption,
  PasswordInputProps,
  SearchInputProps,
} from './components/Input/Input';

export { Checkbox } from './components/Checkbox/Checkbox';
export type { CheckboxProps, CheckState } from './components/Checkbox/Checkbox';
export { Radio, RadioGroup } from './components/Radio/Radio';
export type { RadioProps, RadioGroupProps } from './components/Radio/Radio';
export { Switch } from './components/Switch/Switch';
export type { SwitchProps } from './components/Switch/Switch';
export { SegmentedControl } from './components/SegmentedControl/SegmentedControl';
export type {
  SegmentedControlProps,
  SegmentedOption,
} from './components/SegmentedControl/SegmentedControl';
export { Slider } from './components/Slider/Slider';
export type { SliderProps } from './components/Slider/Slider';
export { MultiSelect } from './components/MultiSelect/MultiSelect';
export type { MultiSelectProps, MultiSelectOption } from './components/MultiSelect/MultiSelect';

export { Badge } from './components/Badge/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './components/Badge/Badge';
export { Tag, StatusBadge, TagSelector } from './components/Tag/Tag';
export type {
  TagProps,
  TagTone,
  StatusBadgeProps,
  StatusBadgeStatus,
  TagSelectorProps,
  TagSelectorOption,
} from './components/Tag/Tag';
export { Avatar } from './components/Avatar/Avatar';
export type { AvatarProps, AvatarSize } from './components/Avatar/Avatar';

export { Divider } from './components/Divider/Divider';
export type { DividerProps, DividerVariant } from './components/Divider/Divider';
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from './components/Accordion/Accordion';
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionPanelProps,
} from './components/Accordion/Accordion';
export { Logo, LOGO_SRC } from './components/Logo/Logo';
export type { LogoProps, LogoSize } from './components/Logo/Logo';
export { Icon, icons, iconNames } from './components/Icon/Icon';
export type { IconProps, IconName } from './components/Icon/Icon';
export { DataTable } from './components/DataTable/DataTable';
export type {
  DataTableProps,
  DataTableColumn,
  DataTableSortType,
} from './components/DataTable/DataTable';
export {
  Table,
  TableHeaderCell,
  TableDataCell,
  TableStatusCell,
  TableTagCell,
  TableAvatarCell,
  TableActionsCell,
  TableBodyRow,
  TableHeaderRow,
  TableFilterToolbar,
  TableBulkActionToolbar,
  TablePaginationBar,
} from './components/Table/Table';
export type {
  TableProps,
  TableHeaderCellProps,
  TableDataCellProps,
  TableStatusCellProps,
  TableTagCellProps,
  TableAvatarCellProps,
  TableActionsCellProps,
  TableBodyRowProps,
  TableHeaderRowProps,
  TableFilterToolbarProps,
  TableBulkActionToolbarProps,
  TablePaginationBarProps,
  TableSortDirection,
  TableAlign,
  TableDensity,
  TableRowState,
  TableStatus,
} from './components/Table/Table';
export { Pagination } from './components/Pagination/Pagination';
export type { PaginationProps } from './components/Pagination/Pagination';
export { FabSpeedDial, FAB_DEMO_ACTIONS } from './components/Fab/Fab';
export type {
  FabSpeedDialProps,
  FabSpeedDialAction,
  FabActionIcon,
} from './components/Fab/Fab';

export { Tooltip } from './components/Tooltip/Tooltip';
export type {
  TooltipProps,
  TooltipVariant,
  TooltipPlacement,
} from './components/Tooltip/Tooltip';
export { InformationPopover } from './components/Popover/InformationPopover';
export type { InformationPopoverProps } from './components/Popover/InformationPopover';

export { Alert } from './components/Alert/Alert';
export type { AlertProps, AlertVariant } from './components/Alert/Alert';
export { Dialog, DialogActions } from './components/Dialog/Dialog';
export type { DialogProps, DialogActionsProps } from './components/Dialog/Dialog';
export { SidePanel } from './components/SidePanel/SidePanel';
export type { SidePanelProps } from './components/SidePanel/SidePanel';
export { Snackbar, Toast } from './components/Snackbar/Snackbar';
export type {
  SnackbarProps,
  SnackbarVariant,
  SnackbarPosition,
  ToastProps,
  ToastVariant,
  ToastPosition,
} from './components/Snackbar/Snackbar';

export { Autocomplete } from './components/Autocomplete/Autocomplete';
export type {
  AutocompleteProps,
  AutocompleteOption,
} from './components/Autocomplete/Autocomplete';
/** Figma Combo box naming alias. */
export { Autocomplete as Combobox } from './components/Autocomplete/Autocomplete';

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs/Tabs';
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './components/Tabs/Tabs';
/** Figma Tab naming alias for TabsTrigger. */
export { TabsTrigger as Tab } from './components/Tabs/Tabs';
export { Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './components/Breadcrumbs/Breadcrumbs';
export { PageHeader } from './components/PageHeader/PageHeader';
export type { PageHeaderProps } from './components/PageHeader/PageHeader';
export { Timeline, TimelineMarker } from './components/Timeline/Timeline';
export type {
  TimelineProps,
  TimelineItem,
  TimelineMarkerVariant,
} from './components/Timeline/Timeline';

export { Form, FormItem, useFormInstance } from './components/Form/Form';
export type { FormProps, FormItemProps, FormLayout } from './components/Form/Form';
export { useForm } from './components/Form/useForm';
export type { FormInstance, FieldRule } from './components/Form/useForm';

export { Spinner } from './components/Spinner/Spinner';
export type { SpinnerProps, SpinnerSize } from './components/Spinner/Spinner';
export { Skeleton } from './components/Skeleton/Skeleton';
export type { SkeletonProps, SkeletonVariant } from './components/Skeleton/Skeleton';
export { EmptyState } from './components/EmptyState/EmptyState';
export type { EmptyStateProps } from './components/EmptyState/EmptyState';
export { TokenInput } from './components/TokenInput/TokenInput';
export type { TokenInputProps } from './components/TokenInput/TokenInput';
export { VisuallyHidden } from './components/VisuallyHidden/VisuallyHidden';
export type { VisuallyHiddenProps } from './components/VisuallyHidden/VisuallyHidden';

export { NavItem } from './components/Navigation/NavItem';
export type { NavItemProps } from './components/Navigation/NavItem';
export { AppSidebar } from './components/Navigation/AppSidebar';
export type { AppSidebarProps } from './components/Navigation/AppSidebar';
/** Figma Collapsible Sidebar — same API as AppSidebar (expanded/collapsed). */
export { AppSidebar as CollapsibleSidebar } from './components/Navigation/AppSidebar';
export type { AppSidebarProps as CollapsibleSidebarProps } from './components/Navigation/AppSidebar';
export { TopNavigation } from './components/Navigation/TopNavigation';
export type { TopNavigationProps, TopNavLink } from './components/Navigation/TopNavigation';
export { NavigationRail } from './components/Navigation/NavigationRail';
export type {
  NavigationRailProps,
  NavigationRailItem,
} from './components/Navigation/NavigationRail';
export { MobileNavigationDrawer } from './components/Navigation/MobileNavigationDrawer';
export type { MobileNavigationDrawerProps } from './components/Navigation/MobileNavigationDrawer';
export { TreeNavigation } from './components/Navigation/TreeNavigation';
export type {
  TreeNavigationProps,
  TreeNavigationItem,
} from './components/Navigation/TreeNavigation';
export { SectionNavigation } from './components/Navigation/SectionNavigation';
export type {
  SectionNavigationProps,
  SectionNavigationItem,
} from './components/Navigation/SectionNavigation';

export { ConfirmationDialog } from './components/Dialog/ConfirmationDialog';
export type {
  ConfirmationDialogProps,
  ConfirmationDialogTone,
} from './components/Dialog/ConfirmationDialog';
export { AlertDialog } from './components/Dialog/AlertDialog';
export type { AlertDialogProps, AlertDialogStatus } from './components/Dialog/AlertDialog';
export { FormDialog } from './components/Dialog/FormDialog';
export type { FormDialogProps } from './components/Dialog/FormDialog';
export { WizardDialog } from './components/Dialog/WizardDialog';
export type {
  WizardDialogProps,
  WizardDialogStep,
} from './components/Dialog/WizardDialog';
export { FullscreenModal } from './components/Dialog/FullscreenModal';
export type { FullscreenModalProps } from './components/Dialog/FullscreenModal';
export { Drawer } from './components/Drawer/Drawer';
export type { DrawerProps } from './components/Drawer/Drawer';

export { RichTextField } from './components/RichTextField/RichTextField';
export type { RichTextFieldProps } from './components/RichTextField/RichTextField';

export { ToastRegion, ToastStack, useToastRegion } from './components/Snackbar/ToastRegion';
export type {
  ToastRegionProps,
  ToastRegionPosition,
  ToastStackProps,
  ToastRegionContextValue,
} from './components/Snackbar/ToastRegion';

export { useMediaQuery } from './hooks/useMediaQuery';
export { BreakpointProvider, useBreakpoint } from './hooks/BreakpointProvider';
export type {
  BreakpointMap,
  BreakpointProviderProps,
  BreakpointContextValue,
} from './hooks/BreakpointProvider';
