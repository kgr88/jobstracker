'use client';
import { Select, SelectItem, Button, Input, Accordion, AccordionItem } from '@heroui/react';
import { AdjustmentsVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';

interface FilterPanelProps {
  onSortChange: (sortOrder: 'asc' | 'desc') => void;
  onSearchChange: (searchTerm: string) => void;
  onStatusFilter: (status: string) => void;
  onClearFilters: () => void;
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
  selectedStatus: string;
}

export default function FilterPanel({
  onSortChange,
  onSearchChange,
  onStatusFilter,
  onClearFilters,
  sortOrder,
  searchTerm,
  selectedStatus,
}: FilterPanelProps) {
  const statusOptions = useMemo(
    () => [
      { key: 'all', label: 'All' },
      { key: 'Applied', label: 'Applied' },
      { key: 'Interview', label: 'Interview' },
      { key: 'Rejected', label: 'Rejected' },
      { key: 'Offer', label: 'Offer' },
    ],
    []
  );

  const FilterContent = useMemo(
    () => (
      <div className="space-y-4 pb-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Search</label>
          <Input
            size="sm"
            placeholder="Enter position or company..."
            value={searchTerm}
            onValueChange={onSearchChange}
            startContent={<MagnifyingGlassIcon className="size-5 text-default-400" />}
            isClearable
            onClear={() => onSearchChange('')}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Filter by Status</label>
          <Select
            size="sm"
            aria-label="Application status filter"
            selectedKeys={[selectedStatus]}
            onSelectionChange={keys => onStatusFilter(Array.from(keys)[0] as string)}>
            {statusOptions.map(status => (
              <SelectItem key={status.key}>{status.label}</SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Sort by Date</label>
          <Select
            size="sm"
            aria-label="Application date sort"
            selectedKeys={[sortOrder]}
            onSelectionChange={keys => onSortChange(Array.from(keys)[0] as 'asc' | 'desc')}>
            <SelectItem key="desc">Newest</SelectItem>
            <SelectItem key="asc">Oldest</SelectItem>
          </Select>
        </div>

        <div>
          <Button variant="bordered" size="sm" className="w-full" onPress={onClearFilters}>
            Clear All
          </Button>
        </div>
      </div>
    ),
    [searchTerm, selectedStatus, sortOrder, onSearchChange, onStatusFilter, onSortChange, onClearFilters, statusOptions]
  );

  return (
    <>
      {/* desktop */}
      <div className="w-64 h-fit sticky top-4 hidden lg:block">
        <Accordion defaultExpandedKeys={['filters']}>
          <AccordionItem
            key="filters"
            aria-label="Search and Filter Options"
            title={
              <div className="flex items-center gap-2">
                <AdjustmentsVerticalIcon className="size-5 text-default-900" />
                <span className="text-lg font-semibold">Filters</span>
              </div>
            }>
            {FilterContent}
          </AccordionItem>
        </Accordion>
      </div>

      {/* mobile */}
      <div className="lg:hidden w-full">
        <Accordion>
          <AccordionItem
            key="filters"
            aria-label="Search and Filter Options"
            title={
              <div className="flex items-center gap-2">
                <AdjustmentsVerticalIcon className="size-5 text-default-900" />
                <span className="text-lg font-semibold">Filters</span>
              </div>
            }>
            {FilterContent}
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
