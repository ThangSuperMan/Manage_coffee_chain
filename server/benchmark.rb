require "benchmark"

input = ('a'..'z').map { |letter| [letter, letter] }.to_h
n = 50_000

Benchmark.bm do |x|
  x.report('Hash[]') do
    n.times { |i| input.map { |key, value| [key.to_sym, value] }.to_h }
  end

  x.report('{}.tap') do
    n.times do
      {}.tap do |new_hash|
        input.each do |key, value|
          new_hash[key.to_sym] = value
        end
      end
    end
  end
end
