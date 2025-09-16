from sklearn.datasets import load_iris
#載入IRIS資料集
iris = load_iris()
#檢查資料集
print(iris.DESCR)
#取得特徵與標籤
X = iris.data
print("X")
print(X)
print("x的形狀",X.shape)
print("x的資料類型",X.dtype)
print("x的內容",X)

print("==="*10)

#請使用pandas套件將X轉換成DataFrame格式，並命名欄位名稱為iris.feature_names
import pandas as pd
df_X = pd.DataFrame(X, columns=iris.feature_names)
print("轉換後的DataFrame:\n", df_X)

print("==="*10)

y = iris.target
print("y")
print(y)
print("y的形狀",y.shape)
print("y的資料類型",y.dtype)
print("y的內容",y)

#3.請使用Matplotlib繪製X的前兩個特徵(sepal length與sepal width)的散佈圖，並依照y的標籤值使用不同顏色標示
import matplotlib.pyplot as plt
plt.figure(figsize=(8, 6))
plt.scatter(X[:, 0], X[:, 1], c=y, cmap='viridis', edgecolor='k', s=100)
plt.title("Iris Dataset - Sepal Length vs Sepal Width")
plt.xlabel(iris.feature_names[0])
plt.ylabel(iris.feature_names[1])
plt.colorbar(label='Species')
plt.grid(True)
plt.show()
print("==="*10)


