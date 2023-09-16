class Api::V1::TestController < Api::V1::BaseController
  def badName(name)
    if name == 'thangphan'
      puts "hello"
    else
      puts "goodbye"
    end
  end
end
