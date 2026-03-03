/**
 * CustomerFeatures Component
 * Shows how the service works (features section)
 */

'use client'

import { Shield, Zap, CheckCircle } from 'lucide-react'

export function CustomerFeatures() {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Simple Process</h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold">1. Connect Google Drive</h4>
            <p className="text-gray-600">
              Sign in and connect your Google Drive so we can access your
              project documents
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-semibold">2. Create Your Docs</h4>
            <p className="text-gray-600">
              Write your project requirements in Google Docs - use whatever
              format works for you
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold">3. Approve & We Build</h4>
            <p className="text-gray-600">
              When your requirements are ready, approve them and we&apos;ll
              start development
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
