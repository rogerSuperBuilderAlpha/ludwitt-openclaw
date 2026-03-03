'use client'

import {
  ExternalLink,
  User,
  Clock,
  Users,
  CheckCircle2,
  Play,
  Archive,
  Tag,
  Send,
  MessageSquare,
} from 'lucide-react'
import { DevButton, DevBadge, DevProgress } from '../ui'
import type { DocumentDetailsViewProps } from './documentDetailTypes'

export function DocumentDetailsView({
  document,
  permissions,
  actions,
  state,
  formatDateTime,
}: DocumentDetailsViewProps) {
  const { isAssignedToMe, isUnassigned, canClaim, canStart, isAdminView } =
    permissions
  const {
    claiming,
    updating,
    messageText,
    setMessageText,
    sendingMessage,
    setView,
  } = state
  const {
    handleClaim,
    handleAssign,
    handleStartWork,
    handleArchive,
    handleSendMessage,
  } = actions

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--dev-space-5)',
      }}
    >
      {/* Status & Tags */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--dev-space-2)',
          flexWrap: 'wrap',
        }}
      >
        {document.status && (
          <DevBadge
            variant={
              document.status === 'completed'
                ? 'success'
                : document.status === 'in-progress'
                  ? 'info'
                  : document.status === 'archived'
                    ? 'default'
                    : 'warning'
            }
          >
            {document.status.charAt(0).toUpperCase() +
              document.status.slice(1).replace('-', ' ')}
          </DevBadge>
        )}
        {document.category && (
          <DevBadge variant="default">
            <Tag size={12} style={{ marginRight: 4 }} />
            {document.category}
          </DevBadge>
        )}
        {document.priority && (
          <DevBadge variant={document.priority}>{document.priority}</DevBadge>
        )}
      </div>

      {/* Progress Bar */}
      {document.progressPercentage !== undefined &&
        document.progressPercentage > 0 && (
          <div>
            <DevProgress
              value={document.progressPercentage}
              size="lg"
              showLabel
              color={
                document.progressPercentage === 100 ? 'success' : 'primary'
              }
            />
            {document.progressNote && (
              <p
                style={{
                  marginTop: 'var(--dev-space-2)',
                  fontSize: 'var(--dev-text-sm)',
                  color: 'var(--dev-text-muted)',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{document.progressNote}&rdquo;
              </p>
            )}
          </div>
        )}

      {/* Action Buttons */}
      <div
        style={{ display: 'flex', gap: 'var(--dev-space-2)', flexWrap: 'wrap' }}
      >
        <DevButton
          as="a"
          href={document.googleDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="sm"
          leftIcon={<ExternalLink size={14} />}
        >
          View Document
        </DevButton>

        {canClaim && isUnassigned && (
          <DevButton
            variant="secondary"
            size="sm"
            leftIcon={<User size={14} />}
            onClick={handleClaim}
            disabled={claiming}
          >
            {claiming ? 'Claiming...' : 'Claim'}
          </DevButton>
        )}

        {isAdminView && isUnassigned && (
          <DevButton
            variant="ghost"
            size="sm"
            leftIcon={<Users size={14} />}
            onClick={handleAssign}
          >
            Assign
          </DevButton>
        )}

        {canStart && (
          <DevButton
            variant="secondary"
            size="sm"
            leftIcon={<Play size={14} />}
            onClick={handleStartWork}
            disabled={updating}
          >
            {updating ? 'Starting...' : 'Start Work'}
          </DevButton>
        )}

        {isAssignedToMe && document.status === 'in-progress' && (
          <>
            <DevButton
              variant="ghost"
              size="sm"
              leftIcon={<Clock size={14} />}
              onClick={() => setView('progress')}
            >
              Update Progress
            </DevButton>
            <DevButton
              variant="success"
              size="sm"
              leftIcon={<CheckCircle2 size={14} />}
              onClick={() => setView('complete')}
            >
              Complete
            </DevButton>
          </>
        )}

        {document.status === 'completed' && isAdminView && (
          <DevButton
            variant="ghost"
            size="sm"
            leftIcon={<Archive size={14} />}
            onClick={handleArchive}
            disabled={updating}
          >
            Archive
          </DevButton>
        )}
      </div>

      {/* Requirements & Sessions Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--dev-space-4)',
        }}
      >
        {/* Requirements */}
        <div>
          <h3
            style={{
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-3)',
              fontSize: 'var(--dev-text-sm)',
            }}
          >
            Requirements ({document.requirements?.length || 0})
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--dev-space-2)',
              maxHeight: 200,
              overflow: 'auto',
            }}
          >
            {document.requirements?.length ? (
              document.requirements.map((req) => (
                <div
                  key={req.id}
                  style={{
                    padding: 'var(--dev-space-3)',
                    background: 'var(--dev-bg-muted)',
                    borderRadius: 'var(--dev-radius-md)',
                    fontSize: 'var(--dev-text-sm)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 8,
                    }}
                  >
                    <span>{req.requirement}</span>
                    <DevBadge
                      size="sm"
                      variant={
                        req.status === 'completed'
                          ? 'success'
                          : req.status === 'in-progress'
                            ? 'info'
                            : 'default'
                      }
                    >
                      {req.status === 'completed'
                        ? 'Done'
                        : req.status === 'in-progress'
                          ? 'WIP'
                          : 'Pending'}
                    </DevBadge>
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  color: 'var(--dev-text-muted)',
                  fontSize: 'var(--dev-text-sm)',
                }}
              >
                No requirements yet
              </p>
            )}
          </div>
        </div>

        {/* Sessions */}
        <div>
          <h3
            style={{
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-3)',
              fontSize: 'var(--dev-text-sm)',
            }}
          >
            Work Sessions ({document.sessions?.length || 0})
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--dev-space-2)',
              maxHeight: 200,
              overflow: 'auto',
            }}
          >
            {document.sessions?.length ? (
              document.sessions.map((session) => (
                <div
                  key={session.id}
                  style={{
                    padding: 'var(--dev-space-3)',
                    background: 'var(--dev-bg-muted)',
                    borderRadius: 'var(--dev-radius-md)',
                    fontSize: 'var(--dev-text-sm)',
                  }}
                >
                  <p style={{ marginBottom: 4 }}>{session.accomplishments}</p>
                  <div
                    style={{
                      display: 'flex',
                      gap: 'var(--dev-space-2)',
                      fontSize: 'var(--dev-text-xs)',
                      color: 'var(--dev-text-muted)',
                    }}
                  >
                    <span>{formatDateTime(session.sessionDate)}</span>
                    {session.timeSpentMinutes && (
                      <span>&bull; {session.timeSpentMinutes} min</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  color: 'var(--dev-text-muted)',
                  fontSize: 'var(--dev-text-sm)',
                }}
              >
                No sessions logged
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Messages Section */}
      {isAssignedToMe && (
        <div>
          <h3
            style={{
              fontWeight: 'var(--dev-font-semibold)',
              marginBottom: 'var(--dev-space-3)',
              fontSize: 'var(--dev-text-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--dev-space-2)',
            }}
          >
            <MessageSquare size={16} />
            Customer Messages
          </h3>
          <div
            style={{
              background: 'var(--dev-bg-muted)',
              borderRadius: 'var(--dev-radius-lg)',
              padding: 'var(--dev-space-3)',
              maxHeight: 200,
              overflow: 'auto',
              marginBottom: 'var(--dev-space-3)',
            }}
          >
            {document.communications?.length ? (
              document.communications.map((comm: any) => (
                <div
                  key={comm.id}
                  style={{
                    padding: 'var(--dev-space-2) var(--dev-space-3)',
                    marginBottom: 'var(--dev-space-2)',
                    background:
                      comm.sentByRole === 'developer'
                        ? 'var(--dev-accent-primary-muted)'
                        : 'var(--dev-bg-elevated)',
                    borderRadius: 'var(--dev-radius-md)',
                    marginLeft:
                      comm.sentByRole === 'developer'
                        ? 'var(--dev-space-6)'
                        : 0,
                    marginRight:
                      comm.sentByRole === 'developer'
                        ? 0
                        : 'var(--dev-space-6)',
                  }}
                >
                  <p
                    style={{ fontSize: 'var(--dev-text-sm)', marginBottom: 4 }}
                  >
                    {comm.message}
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--dev-text-xs)',
                      color: 'var(--dev-text-muted)',
                    }}
                  >
                    {comm.sentByRole === 'developer' ? 'You' : comm.sentBy}{' '}
                    &bull; {formatDateTime(comm.sentAt)}
                  </p>
                </div>
              ))
            ) : (
              <p
                style={{
                  color: 'var(--dev-text-muted)',
                  fontSize: 'var(--dev-text-sm)',
                  textAlign: 'center',
                  padding: 'var(--dev-space-4)',
                }}
              >
                No messages yet
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: 'var(--dev-space-2)' }}>
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..."
              className="dev-input"
              style={{ flex: 1 }}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <DevButton
              variant="primary"
              size="sm"
              icon
              onClick={handleSendMessage}
              disabled={sendingMessage || !messageText.trim()}
            >
              <Send size={16} />
            </DevButton>
          </div>
        </div>
      )}
    </div>
  )
}
