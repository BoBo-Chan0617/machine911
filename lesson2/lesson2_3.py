import numpy as np

#常用來建立陣列的函式
arr1 = np.array([1,2,3,4,5])
print("從列表建立的陣列 arr1:",arr1)

arr2 = np.arange(1, 10, 2)
print("從範圍建立的陣列 arr2:",arr2)

arr3 = np.zeros((2, 3))
print("從全零建立的陣列 arr3:\n",arr3)

arr4 = np.ones((3, 2))
print("從全一建立的陣列 arr4:\n",arr4)

arr5 = np.eye(3)
print("從單位矩陣建立的陣列 arr5:\n",arr5)

arr6 = np.random.rand(2, 2)
print("從隨機數建立的陣列 arr6:\n",arr6)    
print("===============================")

#3.使用Matplotlib繪圖
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title("Sin函數圖形")
plt.xlabel("x")
plt.ylabel("sin(x)")
plt.grid(True)
plt.show()
