'use client'

import { useState } from 'react'

export default function FinancialCalculator() {
  const [income, setIncome] = useState<number | ''>('')
  const [showResults, setShowResults] = useState(false)

  const formatRupiah = (amount: number) => {
    return 'Rp' + amount.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.')
  }


  const calculate = () => {
    if (!income || income <= 0) return alert('Masukkan jumlah pendapatan yang valid')
    setShowResults(true)
  }

  const reset = () => {
    setIncome('')
    setShowResults(false)
  }

  const needs = typeof income === 'number' ? income * 0.5 : 0
  const wants = typeof income === 'number' ? income * 0.3 : 0
  const savings = typeof income === 'number' ? income * 0.2 : 0

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="bg-white max-w-4xl mx-auto shadow-md rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Kalkulator Keuangan Pribadi</h1>
          <p className="opacity-90">Kelola pendapatan Anda dengan aturan 50/30/20</p>
        </div>

        {/* Input */}
        <div className="p-6">
          <label htmlFor="income" className="block mb-2 font-medium text-black">
            Pendapatan Bulanan (Rp)
          </label>
          <div className="flex mb-6">
            <input
              type="number"
              id="income"
              value={income}
              onChange={(e) => setIncome(parseFloat(e.target.value))}
              className="flex-1 p-3 border border-gray-300 rounded-l-lg text-black"
              placeholder="Masukkan pendapatan"
            />
            <button onClick={calculate} className="bg-blue-600 text-white px-4 py-3 rounded-r-lg">
              Hitung
            </button>
          </div>

          {showResults ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Needs */}
                <Card
                  title="Kebutuhan Pokok (50%)"
                  subtitle="Perumahan, makanan, utilitas, transportasi"
                  color="blue"
                  value={needs}
                  percent={50}
                />
                {/* Wants */}
                <Card
                  title="Keinginan (30%)"
                  subtitle="Makan di luar, hiburan, hobi, liburan"
                  color="purple"
                  value={wants}
                  percent={30}
                />
                {/* Savings */}
                <Card
                  title="Tabungan (20%)"
                  subtitle="Dana darurat, investasi, pelunasan utang"
                  color="green"
                  value={savings}
                  percent={20}
                />
              </div>

              {/* Breakdown */}
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <h3 className="text-lg font-semibold mb-3 text-black">Rincian Detail</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {/* Needs Breakdown */}
                  <div>
                    <h4 className="text-blue-700 font-medium mb-1">Kebutuhan Pokok</h4>
                    <p className='text-black'>Perumahan: {formatRupiah(needs * 0.35)}</p>
                    <p className='text-black'>Makanan: {formatRupiah(needs * 0.25)}</p>
                    <p className='text-black'>Transportasi: {formatRupiah(needs * 0.15)}</p>
                  </div>
                  {/* Wants Breakdown */}
                  <div>
                    <h4 className="text-purple-700 font-medium mb-1">Keinginan</h4>
                    <p className='text-black'>Makan di luar: {formatRupiah(wants * 0.35)}</p>
                    <p className='text-black'>Hiburan: {formatRupiah(wants * 0.3)}</p>
                  </div>
                  {/* Savings Breakdown */}
                  <div>
                    <h4 className="text-green-700 font-medium mb-1">Tabungan</h4>
                    <p className='text-black'>Dana Darurat: {formatRupiah(savings * 0.4)}</p>
                    <p className='text-black'>Investasi: {formatRupiah(savings * 0.4)}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              <p className="mb-2">💡 Masukkan pendapatan untuk melihat hasil alokasinya.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t px-6 py-4 text-center text-sm text-gray-500">
          50% Kebutuhan | 30% Keinginan | 20% Tabungan
          {showResults && (
            <button onClick={reset} className="ml-4 text-blue-600 hover:underline">
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

type CardProps = {
  title: string
  subtitle: string
  color: 'blue' | 'purple' | 'green'
  value: number
  percent: number
}

function Card({ title, subtitle, color, value, percent }: CardProps) {
  const barColor = {
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    green: 'bg-green-600',
  }[color]

  const bgColor = {
    blue: 'bg-blue-50 border-blue-100',
    purple: 'bg-purple-50 border-purple-100',
    green: 'bg-green-50 border-green-100',
  }[color]

  return (
    <div className={`${bgColor} border rounded-lg p-4`}>
      <h3 className={`font-semibold text-black mb-2`}>{title}</h3>
      <p className="text-gray-600 text-sm mb-2">{subtitle}</p>
      <div className={`text-xl font-bold text-black mb-2`}>
        Rp{value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.')}
      </div>
      <div className="w-full bg-opacity-30 h-2 rounded-full relative overflow-hidden bg-gray-200">
        <div
          className={`h-2 rounded-full transition-all duration-300 ease-in-out ${barColor}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  )
}
