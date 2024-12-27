import requests

# Map of token IDs to token names
token_names = {
    "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": "JUP",
    "So11111111111111111111111111111111111111112": "SOL",
    "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh": "BTC",
    "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs": "ETH",
    "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr": "POP",
    "Df6yfrKC8kZE3KNkrHERKzAetSxbrWeniQfyJY4Jpump": "CHILL",
    "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm": "WIF",
    "7h5AzpYTAnh4Gyux8Gqko5Fvx4AYQBZdkzHZ2CsBudvJ": "CITADEL"
}

# URL for the API endpoint
url = (
    "https://api.jup.ag/price/v2?"
    "ids=JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN,"
    "So11111111111111111111111111111111111111112,"
    "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh,"
    "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs,"
    "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr,"
    "Df6yfrKC8kZE3KNkrHERKzAetSxbrWeniQfyJY4Jpump,"
    "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm,"
    "7h5AzpYTAnh4Gyux8Gqko5Fvx4AYQBZdkzHZ2CsBudvJ"
)

# Making the GET request
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    data = response.json()
    prices = data.get("data", {})

    # Print the prices with token names
    for token_id, token_data in prices.items():
        token_name = token_names.get(token_id, "Unknown")
        print(f"Unit price of {token_name}: {token_data['price']} USDC")
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")

