'use client'

import { useState } from 'react'

export default function FinancialCalculator() {
  const [showResults, setShowResults] = useState(false)
  const [income, setIncome] = useState<string>('')

  const parseRupiah = (value: string): number =>
    parseInt(value.replace(/[^0-9]/g, '') || '0', 10)

  const formatRupiah = (value: string): string => {
    const number = value.replace(/[^0-9]/g, '')
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const numericValue = rawValue.replace(/[^0-9]/g, '')
    setIncome(formatRupiah(numericValue))
  }

  const calculate = () => {
    setShowResults(true)
  }

  const reset = () => {
    setIncome('')
    setShowResults(false)
  }

  const numericIncome = parseRupiah(income)
  const needs = numericIncome * 0.5
  const wants = numericIncome * 0.3
  const savings = numericIncome * 0.2

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
            <div className="flex items-center w-full">
              <p className="bg-gray-600 text-white py-3 px-3 rounded-l-lg">Rp</p>
              <input
                type="text"
                id="income"
                value={income}
                onChange={handleChange}
                className="flex-1 p-3 border border-gray-300 text-black"
                placeholder="Masukkan pendapatan"
              />
            </div>
            <button
              onClick={calculate}
              className="bg-blue-600 text-white px-4 py-3 rounded-r-lg ml-2"
            >
              Hitung
            </button>
          </div>

          {showResults ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card
                  title="Kebutuhan Pokok (50%)"
                  subtitle="Perumahan, makanan, utilitas, transportasi"
                  color="blue"
                  value={needs}
                  percent={50}
                />
                <Card
                  title="Keinginan (30%)"
                  subtitle="Makan di luar, hiburan, hobi, liburan"
                  color="purple"
                  value={wants}
                  percent={30}
                />
                <Card
                  title="Tabungan (20%)"
                  subtitle="Dana darurat, investasi, pelunasan utang"
                  color="green"
                  value={savings}
                  percent={20}
                />
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <h3 className="text-lg font-semibold mb-3 text-black">Rincian Detail</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="text-blue-700 font-medium mb-1">Kebutuhan Pokok</h4>
                    <p className='text-black'>Perumahan: Rp{formatRupiah((needs * 0.35).toFixed(0))}</p>
                    <p className='text-black'>Makanan: Rp{formatRupiah((needs * 0.25).toFixed(0))}</p>
                    <p className='text-black'>Transportasi: Rp{formatRupiah((needs * 0.15).toFixed(0))}</p>
                  </div>
                  <div>
                    <h4 className="text-purple-700 font-medium mb-1">Keinginan</h4>
                    <p className='text-black'>Makan di luar: Rp{formatRupiah((wants * 0.35).toFixed(0))}</p>
                    <p className='text-black'>Hiburan: Rp{formatRupiah((wants * 0.3).toFixed(0))}</p>
                  </div>
                  <div>
                    <h4 className="text-green-700 font-medium mb-1">Tabungan</h4>
                    <p className='text-black'>Dana Darurat: Rp{formatRupiah((savings * 0.4).toFixed(0))}</p>
                    <p className='text-black'>Investasi: Rp{formatRupiah((savings * 0.4).toFixed(0))}</p>
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
