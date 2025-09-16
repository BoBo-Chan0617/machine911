# 安裝 mglearn 套件
# 在命令列執行: pip install mglearn

import mglearn
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties

# 設定中文字型
font = FontProperties(fname='ChineseFont.ttf', size=14)

# 生成數據集
X, y = mglearn.datasets.make_forge()

# 繪製散點圖
plt.figure(figsize=(8, 6))
mglearn.discrete_scatter(X[:, 0], X[:, 1], y)
plt.title("Forge 數據集", fontproperties=font)
plt.xlabel("第一個特徵", fontproperties=font)
plt.ylabel("第二個特徵", fontproperties=font)
plt.legend(["類別 0", "類別 1"], prop=font)
plt.show()

