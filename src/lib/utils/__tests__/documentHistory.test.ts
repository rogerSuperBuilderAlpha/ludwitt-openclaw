import {
  compareDocumentStates,
  determineChangeType,
  formatChange,
  getChangeTypeConfig,
} from '../documentHistory'
import type { CustomerDocument } from '@/lib/types/customer'

describe('documentHistory (pure functions)', () => {
  // =========================================================================
  // compareDocumentStates
  // =========================================================================
  describe('compareDocumentStates', () => {
    it('returns empty array when both states are identical', () => {
      const doc: Partial<CustomerDocument> = {
        status: 'pending',
        priority: 'high',
        notes: 'some notes',
      }
      const changes = compareDocumentStates(doc, doc)
      expect(changes).toEqual([])
    })

    it('detects status change', () => {
      const oldDoc: Partial<CustomerDocument> = { status: 'pending' }
      const newDoc: Partial<CustomerDocument> = { status: 'approved' }
      const changes = compareDocumentStates(oldDoc, newDoc)
      expect(changes).toEqual([
        { field: 'status', oldValue: 'pending', newValue: 'approved' },
      ])
    })

    it('detects priority change', () => {
      const oldDoc: Partial<CustomerDocument> = { priority: 'low' }
      const newDoc: Partial<CustomerDocument> = { priority: 'high' }
      const changes = compareDocumentStates(oldDoc, newDoc)
      expect(changes).toEqual([
        { field: 'priority', oldValue: 'low', newValue: 'high' },
      ])
    })

    it('detects projectId change', () => {
      const oldDoc: Partial<CustomerDocument> = { projectId: 'proj-1' }
      const newDoc: Partial<CustomerDocument> = { projectId: 'proj-2' }
      const changes = compareDocumentStates(oldDoc, newDoc)
      expect(changes).toEqual([
        { field: 'projectId', oldValue: 'proj-1', newValue: 'proj-2' },
      ])
    })

    it('detects notes change', () => {
      const oldDoc: Partial<CustomerDocument> = { notes: 'old note' }
      const newDoc: Partial<CustomerDocument> = { notes: 'new note' }
      const changes = compareDocumentStates(oldDoc, newDoc)
      expect(changes).toEqual([
        { field: 'notes', oldValue: 'old note', newValue: 'new note' },
      ])
    })

    it('detects budget field changes', () => {
      const oldDoc: Partial<CustomerDocument> = {
        budgetType: 'hours',
        budgetHours: 10,
        budgetAmount: 1000,
        hourlyRate: 100,
        budgetWarningThreshold: 80,
      }
      const newDoc: Partial<CustomerDocument> = {
        budgetType: 'fixed',
        budgetHours: 20,
        budgetAmount: 2000,
        hourlyRate: 150,
        budgetWarningThreshold: 90,
      }
      const changes = compareDocumentStates(oldDoc, newDoc)
      expect(changes).toHaveLength(5)
      expect(changes.find((c) => c.field === 'budgetType')).toEqual({
        field: 'budgetType',
        oldValue: 'hours',
        newValue: 'fixed',
      })
      expect(changes.find((c) => c.field === 'budgetHours')).toEqual({
        field: 'budgetHours',
        oldValue: 10,
        newValue: 20,
      })
      expect(changes.find((c) => c.field === 'hourlyRate')).toEqual({
        field: 'hourlyRate',
        oldValue: 100,
        newValue: 150,
      })
    })

    it('detects multiple changes at once', () => {
      const oldDoc: Partial<CustomerDocument> = {
        status: 'pending',
        priority: 'low',
        notes: 'abc',
      }
      const newDoc: Partial<CustomerDocument> = {
        status: 'approved',
        priority: 'high',
        notes: 'xyz',
      }
      const changes = compareDocumentStates(oldDoc, newDoc)
      expect(changes).toHaveLength(3)
    })

    it('ignores fields not in the tracked list', () => {
      const oldDoc = { customerId: 'old' } as Partial<CustomerDocument>
      const newDoc = { customerId: 'new' } as Partial<CustomerDocument>
      const changes = compareDocumentStates(oldDoc, newDoc)
      expect(changes).toEqual([])
    })

    it('detects change from undefined to a value', () => {
      const oldDoc: Partial<CustomerDocument> = {}
      const newDoc: Partial<CustomerDocument> = { status: 'pending' }
      const changes = compareDocumentStates(oldDoc, newDoc)
      expect(changes).toEqual([
        { field: 'status', oldValue: undefined, newValue: 'pending' },
      ])
    })

    it('detects change from a value to undefined', () => {
      const oldDoc: Partial<CustomerDocument> = { notes: 'something' }
      const newDoc: Partial<CustomerDocument> = {}
      const changes = compareDocumentStates(oldDoc, newDoc)
      expect(changes).toEqual([
        { field: 'notes', oldValue: 'something', newValue: undefined },
      ])
    })

    it('handles empty objects', () => {
      const changes = compareDocumentStates({}, {})
      expect(changes).toEqual([])
    })
  })

  // =========================================================================
  // determineChangeType
  // =========================================================================
  describe('determineChangeType', () => {
    it('returns "created" for empty changes array', () => {
      expect(determineChangeType([])).toBe('created')
    })

    it('returns "approved" when status changes to approved', () => {
      const changes = [
        {
          field: 'status',
          oldValue: 'pending' as const,
          newValue: 'approved' as const,
        },
      ]
      expect(determineChangeType(changes)).toBe('approved')
    })

    it('returns "completed" when status changes to completed', () => {
      const changes = [
        {
          field: 'status',
          oldValue: 'in-progress' as const,
          newValue: 'completed' as const,
        },
      ]
      expect(determineChangeType(changes)).toBe('completed')
    })

    it('returns "archived" when status changes to archived', () => {
      const changes = [
        {
          field: 'status',
          oldValue: 'completed' as const,
          newValue: 'archived' as const,
        },
      ]
      expect(determineChangeType(changes)).toBe('archived')
    })

    it('returns "status_changed" for any other status change', () => {
      const changes = [
        {
          field: 'status',
          oldValue: 'pending' as const,
          newValue: 'in-progress' as const,
        },
      ]
      expect(determineChangeType(changes)).toBe('status_changed')
    })

    it('returns "priority_changed" when priority changes', () => {
      const changes = [
        {
          field: 'priority',
          oldValue: 'low' as const,
          newValue: 'high' as const,
        },
      ]
      expect(determineChangeType(changes)).toBe('priority_changed')
    })

    it('returns "project_assigned" when projectId goes from falsy to a value', () => {
      const changes = [
        {
          field: 'projectId',
          oldValue: undefined,
          newValue: 'proj-1' as const,
        },
      ]
      expect(determineChangeType(changes)).toBe('project_assigned')
    })

    it('returns "project_changed" when projectId changes from one value to another', () => {
      const changes = [
        {
          field: 'projectId',
          oldValue: 'proj-1' as const,
          newValue: 'proj-2' as const,
        },
      ]
      expect(determineChangeType(changes)).toBe('project_changed')
    })

    it('returns "budget_updated" for budgetType change', () => {
      const changes = [
        {
          field: 'budgetType',
          oldValue: 'hours' as const,
          newValue: 'fixed' as const,
        },
      ]
      expect(determineChangeType(changes)).toBe('budget_updated')
    })

    it('returns "budget_updated" for budgetHours change', () => {
      const changes = [{ field: 'budgetHours', oldValue: 10, newValue: 20 }]
      expect(determineChangeType(changes)).toBe('budget_updated')
    })

    it('returns "budget_updated" for budgetAmount change', () => {
      const changes = [
        { field: 'budgetAmount', oldValue: 1000, newValue: 2000 },
      ]
      expect(determineChangeType(changes)).toBe('budget_updated')
    })

    it('returns "budget_updated" for hourlyRate change', () => {
      const changes = [{ field: 'hourlyRate', oldValue: 100, newValue: 150 }]
      expect(determineChangeType(changes)).toBe('budget_updated')
    })

    it('returns "notes_updated" for notes change', () => {
      const changes = [
        { field: 'notes', oldValue: 'old' as const, newValue: 'new' as const },
      ]
      expect(determineChangeType(changes)).toBe('notes_updated')
    })

    it('returns "created" for unrecognized field changes', () => {
      const changes = [
        {
          field: 'unknownField',
          oldValue: 'a' as const,
          newValue: 'b' as const,
        },
      ]
      expect(determineChangeType(changes)).toBe('created')
    })

    it('prioritizes status over priority', () => {
      const changes = [
        {
          field: 'status',
          oldValue: 'pending' as const,
          newValue: 'approved' as const,
        },
        {
          field: 'priority',
          oldValue: 'low' as const,
          newValue: 'high' as const,
        },
      ]
      expect(determineChangeType(changes)).toBe('approved')
    })

    it('prioritizes priority over project', () => {
      const changes = [
        {
          field: 'priority',
          oldValue: 'low' as const,
          newValue: 'high' as const,
        },
        {
          field: 'projectId',
          oldValue: 'proj-1' as const,
          newValue: 'proj-2' as const,
        },
      ]
      expect(determineChangeType(changes)).toBe('priority_changed')
    })

    it('prioritizes project over budget', () => {
      const changes = [
        {
          field: 'projectId',
          oldValue: 'proj-1' as const,
          newValue: 'proj-2' as const,
        },
        { field: 'budgetHours', oldValue: 10, newValue: 20 },
      ]
      expect(determineChangeType(changes)).toBe('project_changed')
    })

    it('prioritizes budget over notes', () => {
      const changes = [
        { field: 'budgetAmount', oldValue: 1000, newValue: 2000 },
        { field: 'notes', oldValue: 'old' as const, newValue: 'new' as const },
      ]
      expect(determineChangeType(changes)).toBe('budget_updated')
    })

    it('returns "project_assigned" when projectId old value is null', () => {
      const changes = [
        { field: 'projectId', oldValue: null, newValue: 'proj-1' as const },
      ]
      expect(determineChangeType(changes)).toBe('project_assigned')
    })

    it('returns "project_assigned" when projectId old value is empty string', () => {
      const changes = [
        {
          field: 'projectId',
          oldValue: '' as const,
          newValue: 'proj-1' as const,
        },
      ]
      expect(determineChangeType(changes)).toBe('project_assigned')
    })
  })

  // =========================================================================
  // formatChange
  // =========================================================================
  describe('formatChange', () => {
    it('formats a status change', () => {
      const result = formatChange({
        field: 'status',
        oldValue: 'pending',
        newValue: 'approved',
      })
      expect(result).toBe('Status: pending \u2192 approved')
    })

    it('formats a priority change', () => {
      const result = formatChange({
        field: 'priority',
        oldValue: 'low',
        newValue: 'high',
      })
      expect(result).toBe('Priority: low \u2192 high')
    })

    it('formats null values as "None"', () => {
      const result = formatChange({
        field: 'projectId',
        oldValue: null,
        newValue: 'proj-1',
      })
      expect(result).toBe('Project: None \u2192 proj-1')
    })

    it('formats undefined values as "None"', () => {
      const result = formatChange({
        field: 'notes',
        oldValue: undefined,
        newValue: 'some notes',
      })
      expect(result).toBe('Notes: None \u2192 some notes')
    })

    it('formats boolean values', () => {
      const result = formatChange({
        field: 'status',
        oldValue: true,
        newValue: false,
      })
      expect(result).toBe('Status: Yes \u2192 No')
    })

    it('formats number values', () => {
      const result = formatChange({
        field: 'budgetHours',
        oldValue: 10,
        newValue: 20,
      })
      expect(result).toBe('Budget Hours: 10 \u2192 20')
    })

    it('uses field name as label for unknown fields', () => {
      const result = formatChange({
        field: 'customField',
        oldValue: 'a',
        newValue: 'b',
      })
      expect(result).toBe('customField: a \u2192 b')
    })

    it('formats budgetAmount label correctly', () => {
      const result = formatChange({
        field: 'budgetAmount',
        oldValue: 1000,
        newValue: 2000,
      })
      expect(result).toBe('Budget Amount: 1000 \u2192 2000')
    })

    it('formats hourlyRate label correctly', () => {
      const result = formatChange({
        field: 'hourlyRate',
        oldValue: 100,
        newValue: 150,
      })
      expect(result).toBe('Hourly Rate: 100 \u2192 150')
    })

    it('formats budgetWarningThreshold label correctly', () => {
      const result = formatChange({
        field: 'budgetWarningThreshold',
        oldValue: 80,
        newValue: 90,
      })
      expect(result).toBe('Budget Warning Threshold: 80 \u2192 90')
    })

    it('formats budgetType label correctly', () => {
      const result = formatChange({
        field: 'budgetType',
        oldValue: 'hours',
        newValue: 'fixed',
      })
      expect(result).toBe('Budget Type: hours \u2192 fixed')
    })
  })

  // =========================================================================
  // getChangeTypeConfig
  // =========================================================================
  describe('getChangeTypeConfig', () => {
    it('returns config for "created"', () => {
      const config = getChangeTypeConfig('created')
      expect(config.label).toBe('Created')
      expect(config.color).toBe('text-blue-600')
    })

    it('returns config for "status_changed"', () => {
      const config = getChangeTypeConfig('status_changed')
      expect(config.label).toBe('Status Changed')
      expect(config.color).toBe('text-gray-600')
    })

    it('returns config for "priority_changed"', () => {
      const config = getChangeTypeConfig('priority_changed')
      expect(config.label).toBe('Priority Changed')
      expect(config.color).toBe('text-orange-600')
    })

    it('returns config for "project_assigned"', () => {
      const config = getChangeTypeConfig('project_assigned')
      expect(config.label).toBe('Project Assigned')
      expect(config.color).toBe('text-purple-600')
    })

    it('returns config for "project_changed"', () => {
      const config = getChangeTypeConfig('project_changed')
      expect(config.label).toBe('Project Changed')
      expect(config.color).toBe('text-purple-600')
    })

    it('returns config for "notes_updated"', () => {
      const config = getChangeTypeConfig('notes_updated')
      expect(config.label).toBe('Notes Updated')
      expect(config.color).toBe('text-gray-600')
    })

    it('returns config for "budget_updated"', () => {
      const config = getChangeTypeConfig('budget_updated')
      expect(config.label).toBe('Budget Updated')
      expect(config.color).toBe('text-green-600')
    })

    it('returns config for "approved"', () => {
      const config = getChangeTypeConfig('approved')
      expect(config.label).toBe('Approved')
      expect(config.color).toBe('text-green-600')
    })

    it('returns config for "completed"', () => {
      const config = getChangeTypeConfig('completed')
      expect(config.label).toBe('Completed')
      expect(config.color).toBe('text-green-600')
    })

    it('returns config for "archived"', () => {
      const config = getChangeTypeConfig('archived')
      expect(config.label).toBe('Archived')
      expect(config.color).toBe('text-gray-600')
    })

    it('returns config for "owner_changed"', () => {
      const config = getChangeTypeConfig('owner_changed')
      expect(config.label).toBe('Owner Changed')
      expect(config.color).toBe('text-indigo-600')
    })

    it('all configs have icon, label, and color', () => {
      const types = [
        'created',
        'status_changed',
        'priority_changed',
        'project_assigned',
        'project_changed',
        'notes_updated',
        'budget_updated',
        'approved',
        'completed',
        'archived',
        'owner_changed',
      ] as const

      for (const type of types) {
        const config = getChangeTypeConfig(type)
        expect(config.label).toBeTruthy()
        expect(config.icon).toBeTruthy()
        expect(config.color).toBeTruthy()
      }
    })

    it('returns default "created" config for unknown change type', () => {
      const config = getChangeTypeConfig('totally_unknown' as any)
      expect(config.label).toBe('Created')
    })
  })
})
