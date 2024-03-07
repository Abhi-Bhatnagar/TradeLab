import yfinance as yf
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    stock_symbol = request.args.get('symbol')

    if not stock_symbol:
        return jsonify({'error': 'Please provide a stock symbol'}), 400

    else:
        stock_info = yf.Ticker(stock_symbol)
        stock_data = {
            'symbol': stock_info.info['symbol'],
            'name': stock_info.info['longName'],
            'price': stock_info.info['currentPrice'],
        }
        return jsonify(stock_data)

if __name__ == '__main__':
    app.run(debug=True)


#aapl = yf.Ticker("AAPL")
#stock_info = aapl.info

#for key,value in stock_info.items():
    #print(key, ":", value)

#data = yf.download("AAPL", start="2019-01-01", end= "2023-01-16")
#data = data.reset_index()
#dates = list(data['Date'])
#close = list(data['Close'])

#plt.plot(dates,close)
#plt.xlabel('Date')
#plt.ylabel('Price')
#plt.title('Apple Stock Price')
#plt.show()